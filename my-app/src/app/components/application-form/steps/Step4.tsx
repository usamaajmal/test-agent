import React from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { VisaFormValues } from '@/app/lib/formData';
import Link from 'next/link';
import StripePaymentForm from '../../payment/StripePaymentForm';

interface Step4Props {
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (errorMsg: string) => void;
}

const Step4: React.FC<Step4Props> = ({ onPaymentSuccess, onPaymentError }) => {
  const { control, formState: { errors, isValid: isStepValid }, getValues } = useFormContext<VisaFormValues>();
  const formData = getValues();
  const acceptTerms = useWatch({ control, name: 'acceptTerms' });

  // Get all form values to check if all fields are valid, not just current step
  // This is a simplified check. For more complex forms, RHF's `formState.isValid` 
  // might need to be checked at the `ApplyPage` level before allowing progression to payment.
  const isEntireFormPotentiallyValid = isStepValid; // Assuming Step 4 is the last and all previous were validated by `handleNext`

  const clientFullName = `${formData.givenNames || ''} ${formData.surname || ''}`.trim();
  const clientEmail = formData.emailAddress || '';

  const renderValue = (key: keyof VisaFormValues, value: any) => {
    if (key === 'passportCopy' && value instanceof FileList && value.length > 0) {
      return value[0].name;
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return value || 'Not provided';
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Review Your Application</h3>
      
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h4 className="text-md font-semibold text-gray-800 mb-3">Summary of Your Information:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {Object.entries(formData).map(([key, value]) => {
            if (key === 'acceptTerms') return null;
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
            return (
              <div key={key} className="flex">
                <span className="font-medium text-gray-600 w-1/2">{label}:</span>
                <span className="text-gray-800 w-1/2 break-words">{renderValue(key as keyof VisaFormValues, value)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <Controller
          name="acceptTerms"
          control={control}
          rules={{ required: 'You must accept the terms and conditions to proceed.' }}
          render={({ field }) => (
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  checked={field.value || false}
                  onChange={field.onChange}
                  className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ${errors.acceptTerms ? 'border-red-500' : ''}`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="acceptTerms" className="font-medium text-gray-700">
                  I have read and accept the{' '}
                  <Link href="/terms-and-conditions" legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500 underline">
                      Terms and Conditions
                    </a>
                  </Link>
                  .
                </label>
                {errors.acceptTerms && (
                  <p className="mt-1 text-xs text-red-500">{errors.acceptTerms.message?.toString()}</p>
                )}
              </div>
            </div>
          )}
        />
      </div>

      {acceptTerms && isEntireFormPotentiallyValid && clientFullName && clientEmail && (
        <div className="mt-8 pt-6 border-t">
          <StripePaymentForm
            onPaymentSuccess={onPaymentSuccess}
            onPaymentError={onPaymentError}
            clientFullName={clientFullName}
            clientEmail={clientEmail}
          />
        </div>
      )}
      
      {acceptTerms && !isEntireFormPotentiallyValid && (
         <p className="mt-4 text-sm text-red-500">
          Please ensure all fields in this and previous steps are correctly filled and valid before payment can be shown.
        </p>
      )}
      {acceptTerms && isEntireFormPotentiallyValid && (!clientFullName || !clientEmail) && (
        <p className="mt-4 text-sm text-orange-600">
          Your name and email from Step 2 must be filled to proceed with payment. Please go back and complete them if the payment form is not visible.
        </p>
      )}

      <p className="mt-4 text-sm text-gray-600">
        Please review all your information carefully. After successful payment, your application will be submitted.
      </p>
    </div>
  );
};

export default Step4;
