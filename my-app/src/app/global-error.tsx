'use client'; // Error components must be Client Components

import React, { useEffect } from 'react';
import Link from 'next/link';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    // In a real app, you'd use something like Sentry, LogRocket, etc.
    console.error("Unhandled Runtime Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-red-600">
              Oops! Something went wrong.
            </h1>
            <p className="mt-2 text-base text-gray-600">
              We encountered an unexpected error. Please try again.
            </p>
            {process.env.NODE_ENV === 'development' && error?.message && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-left">
                <h3 className="text-sm font-semibold text-red-700">Error Details (Development Mode):</h3>
                <p className="mt-1 text-xs text-red-600 break-all">
                  {error.message}
                </p>
                {error.digest && (
                    <p className="mt-1 text-xs text-red-500">Digest: {error.digest}</p>
                )}
                 <pre className="mt-2 text-xs text-gray-500 overflow-auto max-h-48">
                  {error.stack}
                </pre>
              </div>
            )}
            <div className="mt-8 space-y-4">
              <button
                onClick={() => reset()}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Try Again
              </button>
              <Link href="/" legacyBehavior>
                <a className="block w-full px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Go to Homepage
                </a>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
