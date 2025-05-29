import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { VisaFormValues } from '@/app/lib/formData';

export async function POST(request: Request) {
  try {
    const formData = await request.json() as Omit<VisaFormValues, 'passportCopy' | 'acceptTerms'>;
    const applicantName = `${formData.givenNames || 'N/A'} ${formData.surname || 'N/A'}`;

    console.log(`Attempting to send application email for: ${applicantName}`);

    const testAccount = await nodemailer.createTestAccount();
    // Log Ethereal credentials for development/testing
    // In a real app, these would be environment variables and not logged directly.
    console.log('Ethereal Email Account for Testing (send-application):');
    console.log('User:', testAccount.user);
    console.log('Pass:', testAccount.pass);
    
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      }
    });

    let emailBodyHtml = `<h1>New E-Visa Application Received</h1>`;
    emailBodyHtml += `<p><strong>Applicant:</strong> ${formData.surname}, ${formData.givenNames}</p>`;
    emailBodyHtml += `<p><strong>Email:</strong> ${formData.emailAddress || 'N/A'}</p>`;
    emailBodyHtml += `<p><strong>Nationality:</strong> ${formData.nationality || 'N/A'}</p>`;
    emailBodyHtml += `<p><strong>Purpose of Visit:</strong> ${formData.purposeOfVisit || 'N/A'}</p>`;
    emailBodyHtml += `<h2>Full Application Details:</h2><ul>`;

    for (const [key, value] of Object.entries(formData)) {
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      if (key !== 'passportCopy' && key !== 'acceptTerms') {
         emailBodyHtml += `<li><strong>${label}:</strong> ${value || 'N/A'}</li>`;
      }
    }
    emailBodyHtml += `</ul><hr><p><em>This is an automated notification.</em></p>`;
    
    const info = await transporter.sendMail({
      from: '"E-Visa System Notification" <noreply@yourdomain.com>', // Replace yourdomain.com
      to: 'admin@test.com', // Ethereal will capture this
      subject: `New Visa Application Received - Applicant: ${formData.surname || 'Unknown'}`,
      html: emailBodyHtml,
    });

    console.log(`Application email sent successfully for ${applicantName}. Message ID: ${info.messageId}`);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`Ethereal preview URL for ${applicantName}: ${previewUrl}`);
      return NextResponse.json({ 
        message: 'Application data received and email sent successfully.', 
        previewUrl 
      });
    } else {
      return NextResponse.json({ 
        message: 'Application data received and email sent successfully (no preview URL available).'
      });
    }

  } catch (error: any) {
    console.error('Error sending application email:', error.message);
    if (error.responseCode) {
        console.error('Nodemailer Response Code:', error.responseCode);
        console.error('Nodemailer Response:', error.response);
    }
    return NextResponse.json(
      { error: 'Failed to send application email.', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
