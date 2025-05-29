import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// **IMPORTANT NOTE:**
// These are placeholder API keys for development.
// In a real application, use environment variables (e.g., process.env.STRIPE_SECRET_KEY)
// and do not commit secret keys to version control.
const stripeSecretKey = 'sk_test_YOUR_PLACEHOLDER_SECRET_KEY'; // Replace with a real test secret key if you have one
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-04-10', // Use the latest API version
});

export async function POST(request: Request) {
  try {
    const amount = 5900; 
    const currency = 'usd';
    const description = 'E-Visa Application Fee';

    // Optional: Extract application ID or other relevant data from request if needed
    // const { applicationId } = await request.json();
    // console.log(`Creating PaymentIntent for Application ID: ${applicationId}`);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      // metadata: { applicationId }, // Example metadata
    });

    console.log(`Successfully created PaymentIntent: ${paymentIntent.id} for amount: ${amount} ${currency.toUpperCase()}`);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Error creating PaymentIntent:', error.message);
    // Log more details if available (e.g., Stripe error type)
    if (error.type) {
      console.error('Stripe error type:', error.type);
    }
    if (error.raw) {
        console.error('Stripe raw error:', error.raw);
    }
    return NextResponse.json(
      { error: error.message || 'Failed to create PaymentIntent' },
      { status: error.statusCode || 500 }
    );
  }
}
