import { POST } from '../route'; // Adjust path as necessary
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { VisaFormValues } from '@/app/lib/formData';

// Mock nodemailer
let mockSendMail: jest.Mock;
let mockGetTestMessageUrl: jest.Mock;
let mockCreateTestAccount: jest.Mock;

jest.mock('nodemailer', () => {
  mockSendMail = jest.fn();
  mockGetTestMessageUrl = jest.fn();
  mockCreateTestAccount = jest.fn();
  return {
    createTransport: jest.fn().mockReturnValue({ sendMail: mockSendMail }),
    getTestMessageUrl: mockGetTestMessageUrl,
    createTestAccount: mockCreateTestAccount,
  };
});

describe('POST /api/send-application', () => {
  const mockFormData: Omit<VisaFormValues, 'passportCopy' | 'acceptTerms'> = {
    nationality: 'Testland',
    travelDocumentType: 'Ordinary Passport',
    purposeOfVisit: 'Tourism',
    dateOfArrival: '2025-01-01',
    surname: 'Doe',
    givenNames: 'John',
    dateOfBirth: '1990-01-01',
    countryOfBirth: 'Testland',
    placeOfBirth: 'Testville',
    sex: 'Male',
    occupation: 'Tester',
    mobileNumber: '+1234567890',
    permanentAddress: '123 Test St, Testville',
    emailAddress: 'john.doe@example.com',
    passportNumber: 'P123456',
    passportIssueDate: '2020-01-01',
    passportExpiryDate: '2030-01-01',
    addressInAzerbaijan: 'Test Hotel, Baku',
  };

  beforeEach(() => {
    mockSendMail.mockClear();
    mockGetTestMessageUrl.mockClear();
    mockCreateTestAccount.mockClear();

    // Setup mock return values
    mockCreateTestAccount.mockResolvedValue({
      user: 'ethereal-user',
      pass: 'ethereal-pass',
      smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
    });
    mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });
    mockGetTestMessageUrl.mockReturnValue('http://ethereal.email/preview/test-message-id');
  });

  it('should send an email with application data and return success with preview URL', async () => {
    const request = new Request('http://localhost/api/send-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockFormData),
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.message).toBe('Application data received and email sent successfully.');
    expect(responseBody.previewUrl).toBe('http://ethereal.email/preview/test-message-id');
    
    expect(mockCreateTestAccount).toHaveBeenCalledTimes(1);
    expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.objectContaining({
        host: 'smtp.ethereal.email',
        auth: { user: 'ethereal-user', pass: 'ethereal-pass' },
    }));
    expect(mockSendMail).toHaveBeenCalledTimes(1);
    expect(mockSendMail.mock.calls[0][0].to).toBe('admin@test.com');
    expect(mockSendMail.mock.calls[0][0].subject).toContain(mockFormData.surname);
    expect(mockSendMail.mock.calls[0][0].html).toContain(mockFormData.givenNames);
    expect(mockSendMail.mock.calls[0][0].html).toContain(mockFormData.emailAddress);
  });

  it('should return success if no preview URL is available', async () => {
    mockGetTestMessageUrl.mockReturnValue(false); // Simulate no preview URL

    const request = new Request('http://localhost/api/send-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockFormData),
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.message).toBe('Application data received and email sent successfully (no preview URL available).');
    expect(responseBody.previewUrl).toBeUndefined();
  });

  it('should return 500 error if createTestAccount fails', async () => {
    mockCreateTestAccount.mockRejectedValue(new Error('Ethereal account creation failed'));
    
    const request = new Request('http://localhost/api/send-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockFormData),
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody.error).toBe('Failed to send application email.');
    expect(responseBody.details).toBe('Ethereal account creation failed');
  });
  
  it('should return 500 error if sendMail fails', async () => {
    mockSendMail.mockRejectedValue(new Error('SMTP error'));
    
    const request = new Request('http://localhost/api/send-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockFormData),
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody.error).toBe('Failed to send application email.');
    expect(responseBody.details).toBe('SMTP error');
  });
});
