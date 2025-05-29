'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // useSearchParams can be used if you pass data like application ID

const ApplicationSuccessPage = () => {
  const router = useRouter();
  // Example: const searchParams = useSearchParams();
  // const applicationId = searchParams.get('appId');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
        <div>
          <svg 
            className="mx-auto h-16 w-16 text-green-500" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Application Submitted Successfully!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for applying. Your E-Visa application has been received and payment was successful.
          </p>
          {/* {applicationId && (
            <p className="mt-2 text-sm text-gray-500">
              Your Application ID is: <strong>{applicationId}</strong>. Please save this for your records.
            </p>
          )} */}
          <p className="mt-4 text-sm text-gray-600">
            You should receive a confirmation email shortly with further details. If you do not receive an email within a few hours, please check your spam folder or contact support.
          </p>
        </div>
        <div className="mt-8">
          <Link href="/" legacyBehavior>
            <a className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Return to Homepage
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSuccessPage;
