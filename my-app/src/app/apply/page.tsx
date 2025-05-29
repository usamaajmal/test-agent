'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { VisaFormValues, initialFormData, formSteps } from '../lib/formData';

import Step1 from '../components/application-form/steps/Step1';
import Step2 from '../components/application-form/steps/Step2';
import Step3 from '../components/application-form/steps/Step3';
import Step4 from '../components/application-form/steps/Step4';

const ApplyPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm<VisaFormValues>({
    defaultValues: initialFormData,
    mode: 'onChange',
  });

  const { handleSubmit, trigger, formState: { errors, isValid }, getValues, reset } = methods;

  useEffect(() => {
    const savedData = localStorage.getItem('visaFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.passportCopy && typeof parsedData.passportCopy === 'string') {
          parsedData.passportCopy = null;
        }
        reset(parsedData);
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
        localStorage.removeItem('visaFormData');
      }
    }
  }, [reset]);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem('visaFormData', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  useEffect(() => {
    const stepQueryParam = searchParams.get('step');
    const step = parseInt(stepQueryParam || '1', 10);
    if (step >= 1 && step <= formSteps.length) {
      setCurrentStep(step);
    } else {
      router.push(`${pathname}?step=1`);
    }
  }, [searchParams, router, pathname]);

  const currentStepConfig = formSteps.find(s => s.id === currentStep);

  const handleNext = async () => {
    let isValidStep = true;
    if (currentStepConfig?.fields) {
      isValidStep = await trigger(currentStepConfig.fields);
    }

    if (isValidStep && currentStep < formSteps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      router.push(`${pathname}?step=${nextStep}`);
    } else if (isValidStep && currentStep === formSteps.length) {
      handleSubmit(() => { 
        console.log("Final step validation passed, payment form should be visible if conditions in Step4 are met.");
      })();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      router.push(`${pathname}?step=${prevStep}`);
    }
  };

  const handleFinalSubmissionAfterPayment: SubmitHandler<VisaFormValues> = async (data) => {
    console.log('Payment successful. Now attempting to send application data...');
    const { passportCopy, acceptTerms, ...emailData } = data;

    try {
      const response = await fetch('/api/send-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Application data sent successfully:', result.message);
        if (result.previewUrl) {
          console.log(`Ethereal Email Preview URL: ${result.previewUrl}`);
          alert(`Application submitted successfully! Admin notified. (Dev: Check console for Ethereal preview URL)`);
        } else {
          alert('Application submitted successfully! Admin notified.');
        }
      } else {
        const errorResult = await response.json();
        console.error('Failed to send application email:', errorResult.error, errorResult.details);
        alert('Your application and payment were successful. However, there was an issue sending the admin notification email. Please contact support if you have concerns.');
      }
    } catch (error) {
      console.error('Error calling /api/send-application:', error);
      alert('Your application and payment were successful. An unexpected error occurred while sending the admin notification email. Please contact support.');
    } finally {
      localStorage.removeItem('visaFormData');
      router.push('/application-success');
    }
  };

  const handlePaymentFailure = (errorMsg: string) => {
    console.error('Payment failed on ApplyPage:', errorMsg);
    alert(`Payment Error: ${errorMsg}. Please check your payment details or try again.`);
  };

  const renderStep = () => {
    const stepProps: any = {};
    if (currentStep === 4) {
      stepProps.onPaymentSuccess = (paymentIntentId: string) => {
        console.log(`Payment success reported to ApplyPage. Intent ID: ${paymentIntentId}. Triggering final submission process.`);
        handleSubmit(handleFinalSubmissionAfterPayment)();
      };
      stepProps.onPaymentError = handlePaymentFailure;
    }

    switch (currentStep) {
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />;
      case 4: return <Step4 {...stepProps} />;
      default: return <p>Loading step...</p>;
    }
  };

  const getProgress = () => {
    return ((currentStep - 1) / (formSteps.length - 1)) * 100;
  };

  return (
    <FormProvider {...methods}>
      <main className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            E-Visa Application
          </h1>
          <div className="mb-8">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div
                  style={{ width: `${getProgress()}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                {formSteps.map((step, index) => (
                  <div key={step.id} className={`text-center w-1/4 ${currentStep > index ? 'font-semibold text-indigo-600' : ''}`}>
                    Step {step.id}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <section className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-4">
              {currentStepConfig?.title || `Step ${currentStep}`}
            </h2>
            <form onSubmit={handleSubmit(handleFinalSubmissionAfterPayment)} noValidate>
              {renderStep()}
              <div className="mt-8 pt-6 border-t flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {currentStep < formSteps.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="button" 
                    onClick={handleNext} 
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Validate Selections
                  </button>
                )}
              </div>
            </form>
          </section>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 bg-gray-50 p-4 rounded shadow">
              <summary className="text-sm font-medium text-gray-600 cursor-pointer">
                Form State (Dev Only)
              </summary>
              <pre className="mt-2 text-xs text-gray-700 overflow-auto max-h-96">
                {JSON.stringify(methods.watch(), null, 2)}
              </pre>
              <pre className="mt-2 text-xs text-red-500 overflow-auto max-h-96">
                ERRORS: {JSON.stringify(errors, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </main>
    </FormProvider>
  );
};

export default ApplyPage;
