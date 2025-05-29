'use client';

import React, { useState, useEffect } from 'react';
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe, StripeError } from '@stripe/stripe-js';

// **IMPORTANT NOTE:**
// This is a placeholder publishable API key for development.
// In a real application, use environment variables (e.g., process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
// and do not commit actual keys to version control if they are not meant to be public.
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_PLACEHOLDER_PUBLISHABLE_KEY'; // Replace with a real test publishable key
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface StripePaymentFormProps {
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (errorMsg: string) => void;
  clientFullName: string; // For billing details
  clientEmail: string; // For billing details and receipt
}

const CheckoutForm: React.FC<StripePaymentFormProps> = ({ 
  onPaymentSuccess, 
  onPaymentError,
  clientFullName,
  clientEmail,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    // Fetch PaymentIntent client secret from the backend
    const fetchPaymentIntent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Optionally, pass amount or other details if your API expects them
          // body: JSON.stringify({ items: [{ id: 'visa-application-fee' }] }), 
        });
        const data = await response.json();
        if (response.ok) {
          setClientSecret(data.clientSecret);
        } else {
          setError(data.error || 'Failed to initialize payment.');
          onPaymentError(data.error || 'Failed to initialize payment.');
        }
      } catch (err) {
        console.error('Error fetching client secret:', err);
        const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(errorMsg);
        onPaymentError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [onPaymentError]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setError('Stripe.js has not loaded yet or client secret is missing.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card details not found.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSucceeded(false);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: clientFullName, // Get from form data
            email: clientEmail, // Get from form data
          },
        },
      });

      if (stripeError) {
        console.error('Stripe Error:', stripeError);
        let errorMessage = stripeError.message || 'An unknown payment error occurred.';
        // Provide more specific messages for common errors
        if (stripeError.type === "card_error" || stripeError.type === "validation_error") {
            errorMessage = stripeError.message || "Please check your card details and try again.";
        }
        setError(errorMessage);
        onPaymentError(errorMessage);
        setSucceeded(false);
      } else if (paymentIntent?.status === 'succeeded') {
        setSucceeded(true);
        setError(null);
        onPaymentSuccess(paymentIntent.id);
        // Clear CardElement (optional, as usually you navigate away)
        cardElement.clear();
      } else {
        setError(`Payment status: ${paymentIntent?.status ?? 'unknown'}. Please try again.`);
        onPaymentError(`Payment status: ${paymentIntent?.status ?? 'unknown'}. Please try again.`);
        setSucceeded(false);
      }
    } catch (err: any) {
        console.error('Unexpected error during payment confirmation:', err);
        const errorMsg = err.message || 'An unexpected error occurred.';
        setError(errorMsg);
        onPaymentError(errorMsg);
        setSucceeded(false);
    } finally {
      setIsLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  if (!clientSecret && !error && isLoading) {
    return <p className="text-center text-gray-600">Initializing payment gateway...</p>;
  }
  if (error && !clientSecret) { // If client secret fetch failed
    return <p className="text-center text-red-600">Error: {error}</p>;
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <h4 className="text-lg font-medium text-gray-800 mb-4">Enter Payment Details</h4>
      
      <div className="p-3 border border-gray-200 rounded-md">
        <CardElement options={cardElementOptions} />
      </div>

      {error && (
        <div id="card-errors" role="alert" className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
      {succeeded && (
        <div className="text-green-600 text-sm font-semibold mt-2">
          Payment Successful!
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !clientSecret || isLoading || succeeded}
        className={`w-full px-4 py-2 text-white font-semibold rounded-md transition-colors
                    ${isLoading || !stripe || succeeded ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}
                    focus:outline-none focus:ring-2 focus:ring-offset-2`}
      >
        {isLoading ? 'Processing...' : succeeded ? 'Payment Complete' : `Pay $59.00 USD`}
      </button>
      {succeeded && <p className="text-xs text-center text-gray-500 mt-2">You will be redirected shortly...</p>}
    </form>
  );
};


// Wrapper component to provide Elements context
const StripePaymentForm: React.FC<StripePaymentFormProps> = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
);


export default StripePaymentForm;
