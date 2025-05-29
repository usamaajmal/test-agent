import { POST } from '../route'; // Adjust path as needed
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Mock the Stripe library
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    paymentIntents: {
      create: jest.fn(),
    },
  }));
});

const mockStripeInstance = new Stripe('sk_test_mockkey', { apiVersion: '2024-04-10' });

describe('POST /api/create-payment-intent', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (mockStripeInstance.paymentIntents.create as jest.Mock).mockClear();
  });

  it('should create a payment intent and return a client_secret on success', async () => {
    const mockPaymentIntent = {
      id: 'pi_mock123',
      client_secret: 'pi_mock123_secret_mockSecret',
      amount: 5900,
      currency: 'usd',
    };
    (mockStripeInstance.paymentIntents.create as jest.Mock).mockResolvedValue(mockPaymentIntent);
    
    // We need to mock the global Stripe constructor to return our mockStripeInstance
    (Stripe as unknown as jest.Mock).mockImplementation(() => mockStripeInstance);


    const request = new Request('http://localhost/api/create-payment-intent', {
      method: 'POST',
      // body: JSON.stringify({ applicationId: 'app123' }), // If you pass data
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.clientSecret).toBe(mockPaymentIntent.client_secret);
    expect(mockStripeInstance.paymentIntents.create).toHaveBeenCalledTimes(1);
    expect(mockStripeInstance.paymentIntents.create).toHaveBeenCalledWith({
      amount: 5900,
      currency: 'usd',
      description: 'E-Visa Application Fee',
    });
  });

  it('should return a 500 error if Stripe fails to create a payment intent', async () => {
    const errorMessage = 'Stripe Error: Card declined';
    (mockStripeInstance.paymentIntents.create as jest.Mock).mockRejectedValue(new Error(errorMessage));
    (Stripe as unknown as jest.Mock).mockImplementation(() => mockStripeInstance);


    const request = new Request('http://localhost/api/create-payment-intent', {
      method: 'POST',
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody.error).toBe(errorMessage);
    expect(mockStripeInstance.paymentIntents.create).toHaveBeenCalledTimes(1);
  });

  it('should handle Stripe error with statusCode', async () => {
    const stripeError = {
        message: 'Invalid API Key',
        statusCode: 401,
        type: 'invalid_request_error',
    };
    (mockStripeInstance.paymentIntents.create as jest.Mock).mockRejectedValue(stripeError);
    (Stripe as unknown as jest.Mock).mockImplementation(() => mockStripeInstance);

    const request = new Request('http://localhost/api/create-payment-intent', {
      method: 'POST',
    });
    
    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(401);
    expect(responseBody.error).toBe(stripeError.message);
  });
});
