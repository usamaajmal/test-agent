import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Azerbaijan eVisa',
  description: 'Read the terms and conditions for applying for an Azerbaijan eVisa. Understand your responsibilities and the application process rules.',
  keywords: ['Azerbaijan eVisa terms', 'visa conditions', 'eVisa policy', 'terms of service'],
};

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-lg shadow-md">
        <article className="prose prose-indigo lg:prose-lg">
          <h1>Terms and Conditions for Azerbaijan eVisa Application</h1>

          <p>Last Updated: {new Date().toLocaleDateString()}</p>

          <p>
            Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the
            Azerbaijan eVisa application service (the "Service") operated by us. Your access to and use of the
            Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all
            visitors, users, and others who access or use the Service.
          </p>

          <h2>1. Introduction</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>

          <h2>2. Eligibility</h2>
          <p>
            To be eligible to apply for an Azerbaijan eVisa through this Service, you must meet the criteria
            specified by the Government of Azerbaijan. This includes, but is not limited to, holding a valid
            passport from an eligible country, intending to visit for an approved purpose (e.g., tourism, business),
            and meeting all health and character requirements. It is your responsibility to ensure you meet these
            requirements.
          </p>
          
          <h2>3. Application Process</h2>
          <p>
            Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scel<span className="text-red-500">er</span>isque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta.
          </p>

          <h2>4. Fees and Payments</h2>
          <p>
            All applicable fees for the eVisa application must be paid at the time of submission. Fees are
            non-refundable, regardless of the outcome of your application. Payments are processed through a secure
            third-party payment gateway. We are not responsible for any issues arising from the payment processor.
          </p>

          <h2>5. Processing Times</h2>
          <p>
            Standard processing time for an Azerbaijan eVisa is typically 3-5 working days. However, processing
            times are estimates and not guarantees. Delays may occur due to various factors, including provision of
            incorrect or incomplete information, high application volumes, or additional security checks. We are not
            liable for any delays.
          </p>

          <h2>6. Accuracy of Information</h2>
          <p>
            You are solely responsible for the accuracy and completeness of all information provided in your
            application. Any false or misleading information may result in the rejection of your application,
            revocation of an issued eVisa, or denial of entry into Azerbaijan.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall our Service, nor its directors, employees, partners, agents, suppliers, or
            affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
            including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
            resulting from (i) your access to or use of or inability to access or use the Service; (ii) any
            conduct or content of any third party on the Service; (iii) any content obtained from the Service; and
            (iv) unauthorized access, use or alteration of your transmissions or content, whether based on
            warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been
            informed of the possibility of such damage, and even if a remedy set forth herein is found to have
            failed of its essential purpose.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
            revision is material we will try to provide at least 30 days' notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please{' '}
            <Link href="/contact-us" className="text-indigo-600 hover:underline">
              contact us
            </Link>
             (Note: Contact page not yet created).
          </p>
        </article>
        <div className="mt-10 text-center">
            <Link href="/apply" className="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Start New Application
            </Link>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditionsPage;
