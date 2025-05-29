import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Eligible Countries for Azerbaijan eVisa | Azerbaijan eVisa Application',
  description: 'Find out if your country is eligible for the Azerbaijan eVisa program. Check the updated list of eligible nationalities.',
  keywords: ['Azerbaijan eVisa eligible countries', 'visa eligibility Azerbaijan', 'eVisa country list', 'Azerbaijan travel permit'],
};

const EligibleCountriesPage = () => {
  const exampleCountries = [
    'United States of America', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Italy', 'Spain', 'Japan', 'South Korea', 
    'China', 'India', 'Brazil', 'Argentina', 'Turkey', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Israel', 'Singapore',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-lg shadow-md">
        <article className="prose prose-indigo lg:prose-lg">
          <h1>Eligible Countries for Azerbaijan eVisa</h1>

          <p>Last Updated: {new Date().toLocaleDateString()}</p>

          <p>
            Citizens of the following countries are eligible to apply for an electronic visa (eVisa) to the
            Republic of Azerbaijan. Please ensure your nationality is listed below before starting your
            application. If your country is not listed, you may need to apply for a traditional visa through
            an Azerbaijani embassy or consulate.
          </p>

          <h2>List of Eligible Countries:</h2>
          <p>
            <em>This is a sample list for demonstration purposes. Please refer to the official website of the
            Azerbaijan Ministry of Foreign Affairs or the ASAN Visa system for the definitive and most up-to-date
            list of eligible countries.</em>
          </p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 my-6">
            {exampleCountries.map((country, index) => (
              <li key={index} className="py-1">{country}</li>
            ))}
          </ul>

          <h2>Important Notes:</h2>
          <ul>
            <li>
              Eligibility can change. Always verify the current list from official sources before planning travel
              or applying.
            </li>
            <li>
              Even if your country is eligible, you must meet all other visa requirements, including passport
              validity and purpose of visit.
            </li>
            <li>
              Some countries may have specific conditions or different types of visas available.
            </li>
          </ul>
          
          <p className="mt-6">
            If you are unsure about your eligibility or have specific questions, it is recommended to contact the
            nearest Embassy or Consulate of the Republic of Azerbaijan.
          </p>
        </article>
        <div className="mt-10 text-center">
            <Link href="/apply" className="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Start Your Application
            </Link>
        </div>
      </main>
    </div>
  );
};

export default EligibleCountriesPage;
