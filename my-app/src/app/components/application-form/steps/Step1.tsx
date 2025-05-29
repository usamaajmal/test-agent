import React from 'react';
import { useFormContext } from 'react-hook-form';
import { VisaFormValues } from '@/app/lib/formData';
import TextInput from '../../form/TextInput';
import SelectInput from '../../form/SelectInput';
import DateInput from '../../form/DateInput';

const Step1 = () => {
  const { register, formState: { errors } } = useFormContext<VisaFormValues>();

  const nationalityOptions = [
    { value: 'usa', label: 'USA' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'can', label: 'Canada' },
    { value: 'other', label: 'Other' },
  ];

  const travelDocumentOptions = [
    { value: 'ordinary_passport', label: 'Ordinary Passport' },
    { value: 'diplomatic_passport', label: 'Diplomatic Passport' },
    { value: 'service_passport', label: 'Service Passport' },
  ];

  const purposeOfVisitOptions = [
    { value: 'tourism', label: 'Tourism' },
    { value: 'business', label: 'Business' },
    { value: 'education', label: 'Education' },
    { value: 'family_visit', label: 'Family Visit' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Basic Information & Travel Details
      </h3>
      <SelectInput<VisaFormValues>
        label="Nationality / Citizenship"
        name="nationality"
        register={register}
        errors={errors}
        options={nationalityOptions}
        validationRules={{ required: 'Nationality is required' }}
        placeholder="Select your nationality"
      />
      <SelectInput<VisaFormValues>
        label="Travel Document Type"
        name="travelDocumentType"
        register={register}
        errors={errors}
        options={travelDocumentOptions}
        validationRules={{ required: 'Travel document type is required' }}
        placeholder="Select your travel document"
      />
      <SelectInput<VisaFormValues>
        label="Purpose of Visit"
        name="purposeOfVisit"
        register={register}
        errors={errors}
        options={purposeOfVisitOptions}
        validationRules={{ required: 'Purpose of visit is required' }}
        placeholder="Select purpose of visit"
      />
      <DateInput<VisaFormValues>
        label="Date of Arrival in Azerbaijan"
        name="dateOfArrival"
        register={register}
        errors={errors}
        validationRules={{
          required: 'Date of arrival is required',
          validate: (value) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Remove time part for comparison
            const selectedDate = new Date(value);
            return selectedDate >= today || 'Arrival date cannot be in the past';
          }
        }}
        dateFormat="yyyy-mm-dd" // Value is yyyy-mm-dd, display is locale-dependent
      />
      <p className="mt-2 text-sm text-gray-600">
        Note: Your E-Visa will be valid for 90 days from the date of arrival.
      </p>
    </div>
  );
};

export default Step1;
