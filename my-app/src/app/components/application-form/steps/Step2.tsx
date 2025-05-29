import React from 'react';
import { useFormContext } from 'react-hook-form';
import { VisaFormValues } from '@/app/lib/formData';
import TextInput from '../../form/TextInput';
import SelectInput from '../../form/SelectInput';
import DateInput from '../../form/DateInput';

const Step2 = () => {
  const { register, formState: { errors } } = useFormContext<VisaFormValues>();

  const countryOptions = [
    { value: 'usa', label: 'USA' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'can', label: 'Canada' },
    { value: 'aze', label: 'Azerbaijan' },
    { value: 'tur', label: 'Turkey' },
    { value: 'other', label: 'Other' },
  ];

  const sexOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const occupationOptions = [
    { value: 'employed', label: 'Employed' },
    { value: 'student', label: 'Student' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'retired', label: 'Retired' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Details</h3>
      <TextInput<VisaFormValues>
        label="Surname (as per travel document)"
        name="surname"
        register={register}
        errors={errors}
        validationRules={{ required: 'Surname is required' }}
        placeholder="Enter your surname"
      />
      <TextInput<VisaFormValues>
        label="Other Names / Given Name(s) (as per travel document)"
        name="givenNames"
        register={register}
        errors={errors}
        validationRules={{ required: 'Given name(s) is required' }}
        placeholder="Enter your given name(s)"
      />
      <DateInput<VisaFormValues>
        label="Date of Birth"
        name="dateOfBirth"
        register={register}
        errors={errors}
        validationRules={{
          required: 'Date of birth is required',
          validate: (value) => {
            const today = new Date();
            const birthDate = new Date(value);
            // Basic age check: e.g. must be at least 1 day old and not in future
            return birthDate < today || 'Date of birth must be in the past.';
          }
        }}
        dateFormat="yyyy-mm-dd"
      />
      <SelectInput<VisaFormValues>
        label="Country of Birth"
        name="countryOfBirth"
        register={register}
        errors={errors}
        options={countryOptions} // Placeholder, ideally a comprehensive list
        validationRules={{ required: 'Country of birth is required' }}
        placeholder="Select country of birth"
      />
      <TextInput<VisaFormValues>
        label="Place of Birth (City/Town)"
        name="placeOfBirth"
        register={register}
        errors={errors}
        validationRules={{ required: 'Place of birth is required' }}
        placeholder="Enter your place of birth"
      />
      <SelectInput<VisaFormValues>
        label="Sex"
        name="sex"
        register={register}
        errors={errors}
        options={sexOptions}
        validationRules={{ required: 'Sex is required' }}
        placeholder="Select your sex"
      />
      <SelectInput<VisaFormValues>
        label="Occupation"
        name="occupation"
        register={register}
        errors={errors}
        options={occupationOptions}
        validationRules={{ required: 'Occupation is required' }}
        placeholder="Select your occupation"
      />
      <TextInput<VisaFormValues>
        label="Mobile Number (with country code)"
        name="mobileNumber"
        type="tel"
        register={register}
        errors={errors}
        validationRules={{
          required: 'Mobile number is required',
          pattern: {
            value: /^\+?[1-9]\d{1,14}$/, // Basic international phone number regex
            message: 'Invalid phone number format (e.g., +1234567890)',
          },
        }}
        placeholder="+1234567890"
      />
      <TextInput<VisaFormValues>
        label="Permanent Residential Address"
        name="permanentAddress"
        register={register}
        errors={errors}
        validationRules={{ required: 'Permanent address is required' }}
        placeholder="Enter your permanent address"
      />
      <TextInput<VisaFormValues>
        label="E-mail Address"
        name="emailAddress"
        type="email"
        register={register}
        errors={errors}
        validationRules={{
          required: 'Email address is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
        placeholder="you@example.com"
      />
    </div>
  );
};

export default Step2;
