export interface VisaFormValues {
  // Step 1: Basic Information & Travel Details
  nationality: string;
  travelDocumentType: string;
  purposeOfVisit: string;
  dateOfArrival: string; // YYYY-MM-DD

  // Step 2: Personal Details
  surname: string;
  givenNames: string;
  dateOfBirth: string; // YYYY-MM-DD
  countryOfBirth: string;
  placeOfBirth: string;
  sex: string;
  occupation: string;
  mobileNumber: string;
  permanentAddress: string;
  emailAddress: string;

  // Step 3: Passport Information & Upload
  passportNumber: string;
  passportIssueDate: string; // YYYY-MM-DD
  passportExpiryDate: string; // YYYY-MM-DD
  passportCopy: FileList | null;
  addressInAzerbaijan: string;

  // Step 4: Review & Terms
  acceptTerms: boolean;
}

export const initialFormData: VisaFormValues = {
  nationality: '',
  travelDocumentType: '',
  purposeOfVisit: '',
  dateOfArrival: '',
  surname: '',
  givenNames: '',
  dateOfBirth: '',
  countryOfBirth: '',
  placeOfBirth: '',
  sex: '',
  occupation: '',
  mobileNumber: '',
  permanentAddress: '',
  emailAddress: '',
  passportNumber: '',
  passportIssueDate: '',
  passportExpiryDate: '',
  passportCopy: null,
  addressInAzerbaijan: '',
  acceptTerms: false,
};

export interface FormStep {
  id: number;
  title: string;
  fields: (keyof VisaFormValues)[]; // To link fields to steps
}

export const formSteps: FormStep[] = [
  {
    id: 1,
    title: 'Basic Information & Travel Details',
    fields: ['nationality', 'travelDocumentType', 'purposeOfVisit', 'dateOfArrival'],
  },
  {
    id: 2,
    title: 'Personal Details',
    fields: [
      'surname',
      'givenNames',
      'dateOfBirth',
      'countryOfBirth',
      'placeOfBirth',
      'sex',
      'occupation',
      'mobileNumber',
      'permanentAddress',
      'emailAddress',
    ],
  },
  {
    id: 3,
    title: 'Passport Information & Upload',
    fields: [
      'passportNumber',
      'passportIssueDate',
      'passportExpiryDate',
      'passportCopy',
      'addressInAzerbaijan',
    ],
  },
  {
    id: 4,
    title: 'Review & Terms',
    fields: ['acceptTerms'], // This step will mostly display data
  },
];
