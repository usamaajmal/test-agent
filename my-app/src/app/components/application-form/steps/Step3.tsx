import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { VisaFormValues } from '@/app/lib/formData';
import TextInput from '../../form/TextInput';
import DateInput from '../../form/DateInput';
import FileInput from '../../form/FileInput'; // Ensure this is correctly imported

const Step3 = () => {
  const { register, formState: { errors }, control, watch } = useFormContext<VisaFormValues>();
  const dateOfArrival = watch('dateOfArrival');

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Passport Information & Upload</h3>
      <TextInput<VisaFormValues>
        label="Passport Number"
        name="passportNumber"
        register={register}
        errors={errors}
        validationRules={{
          required: 'Passport number is required',
          pattern: {
            value: /^[A-Za-z0-9]+$/,
            message: 'Passport number should not contain symbols or spaces',
          },
        }}
        placeholder="Enter passport number"
      />
      <DateInput<VisaFormValues>
        label="Passport Issue Date"
        name="passportIssueDate"
        register={register}
        errors={errors}
        validationRules={{
          required: 'Passport issue date is required',
          validate: (value) => {
            const today = new Date();
            const issueDate = new Date(value);
            return issueDate <= today || 'Issue date cannot be in the future.';
          }
        }}
        dateFormat="yyyy-mm-dd"
      />
      <DateInput<VisaFormValues>
        label="Passport Expiry Date"
        name="passportExpiryDate"
        register={register}
        errors={errors}
        validationRules={{
          required: 'Passport expiry date is required',
          validate: (value) => {
            const expiryDate = new Date(value);
            if (!dateOfArrival) {
                // If arrival date is not set, just ensure expiry is in future
                return expiryDate > new Date() || 'Expiry date must be in the future.';
            }
            const arrival = new Date(dateOfArrival);
            // e-visa validity is 90 days from arrival
            // passport must be valid for at least 3 months (approx 90 days) after e-visa validity period
            const minExpiry = new Date(arrival);
            minExpiry.setDate(arrival.getDate() + 90 + 90); // arrival + 90 days visa + 90 days buffer
            
            return expiryDate > minExpiry || `Passport must be valid for at least 6 months after your planned arrival date. Minimum expiry: ${minExpiry.toLocaleDateString()}`;
          }
        }}
        dateFormat="yyyy-mm-dd"
      />
      <FileInput<VisaFormValues>
        label="Copy of Passport (Main Page)"
        name="passportCopy"
        register={register} // register is passed, FileInput handles its own validation logic including this
        errors={errors}
        control={control} // Pass control for watching file input if needed by FileInput
        acceptedFormats=".jpg,.jpeg,.png,.pdf"
        maxFileSizeMB={6}
        // validationRules are now mostly handled inside FileInput's validate function
        // but you can add more specific react-hook-form rules if needed.
        // For example, 'required' is handled by the internal validate function.
         validationRules={{ required: 'Passport copy is required.' }}
      />
      <TextInput<VisaFormValues>
        label="Address in Azerbaijan (Hotel Name, Full Address, etc.)"
        name="addressInAzerbaijan"
        register={register}
        errors={errors}
        validationRules={{ required: 'Address in Azerbaijan is required' }}
        placeholder="Enter your address in Azerbaijan"
      />
    </div>
  );
};

export default Step3;
