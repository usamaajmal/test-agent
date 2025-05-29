import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Azerbaijan eVisa Requirements | Azerbaijan eVisa Application',
  description: 'Understand the necessary requirements for applying for an Azerbaijan eVisa, including passport validity, required documents, and other criteria.',
  keywords: ['Azerbaijan eVisa requirements', 'visa documents Azerbaijan', 'eVisa application criteria', 'Azerbaijan travel documents'],
};

const VisaRequirementsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-lg shadow-md">
        <article className="prose prose-indigo lg:prose-lg">
          <h1>Azerbaijan eVisa Requirements</h1>

          <p>Last Updated: {new Date().toLocaleDateString()}</p>

          <p>
            To successfully apply for an electronic visa (eVisa) to the Republic of Azerbaijan, applicants must
            meet several key requirements. Please review the following information carefully to ensure you have
            all necessary documentation and meet the eligibility criteria before submitting your application.
          </p>

          <h2>1. Passport Requirements</h2>
          <ul>
            <li>
              <strong>Validity:</strong> Your ordinary passport or travel document must be valid for at least
              six (6) months beyond the intended period of stay in Azerbaijan.
            </li>
            <li>
              <strong>Blank Pages:</strong> Ensure there is at least one blank page in your passport for stamps.
            </li>
            <li>
              <strong>Copy:</strong> A clear, color scanned copy of the main information page of your passport
              (showing your photo, personal details, and passport issue/expiry dates) is required for the online
              application. The file should be in JPEG, JPG, PNG, or PDF format and typically under 6MB.
            </li>
          </ul>

          <h2>2. Purpose of Visit</h2>
          <p>
            The eVisa is generally issued for purposes such as tourism, business, medical treatment, humanitarian
            visits, sports, and cultural events. You will need to select your purpose of visit during the
            application process. Ensure your intended activities align with the selected purpose.
          </p>

          <h2>3. Digital Photograph (If Applicable)</h2>
          <p>
            While the primary document is the passport copy, some visa types or specific instructions might
            require a recent color passport-style photograph. For the standard eVisa, typically only the passport
            scan is needed. (This section is a placeholder; verify official requirements).
          </p>
          
          <h2>4. Means of Sustenance</h2>
          <p>
            Applicants should have sufficient funds to cover their stay in Azerbaijan. While proof of funds is not
            always required during the online application, it may be requested upon arrival or by immigration
            officials.
          </p>

          <h2>5. Accommodation Details</h2>
          <p>
            You will be required to provide the address of your intended accommodation in Azerbaijan (e.g., hotel
            booking confirmation, address of host).
          </p>
          
          <h2>6. Email Address</h2>
          <p>
            A valid email address is required to receive notifications about your application status and the eVisa
            itself once approved.
          </p>

          <h2>7. Payment Method</h2>
          <p>
            A valid credit or debit card (Visa, Mastercard, etc.) is required to pay the eVisa application fee.
            The fee is non-refundable.
          </p>

          <h2>8. Additional Considerations</h2>
          <ul>
            <li>
              <strong>Minors:</strong> Applications for minors (under 18) may require additional documentation,
              such as a birth certificate and consent letters from parents/guardians.
            </li>
            <li>
              <strong>Previous Travel to Certain Regions:</strong> If you have previously traveled to the
              Nagorno-Karabakh region and other surrounding regions of the Republic of Azerbaijan occupied by the
              Republic of Armenia, your application may be denied or require special clearance. It is advisable
              to declare such travel if asked. (This is a sensitive point; wording should be checked against official sources).
            </li>
            <li>
              <strong>Health Requirements:</strong> Depending on the global health situation, there might be
              additional health declarations or vaccination requirements.
            </li>
          </ul>

          <p className="mt-6 font-semibold">
            Disclaimer: The information provided here is for general guidance only. Requirements can change.
            Applicants are strongly advised to consult the official website of the Azerbaijan Ministry of Foreign
            Affairs or the ASAN Visa system for the most current and comprehensive visa requirements before
            applying.
          </p>
        </article>
        <div className="mt-10 text-center">
            <Link href="/apply" className="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Apply for eVisa Now
            </Link>
        </div>
      </main>
    </div>
  );
};

export default VisaRequirementsPage;
