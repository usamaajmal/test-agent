import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm, FieldError } from 'react-hook-form';
import TextInput from '../TextInput'; // Adjust path as necessary

// Define a type for the form values for these tests
interface TestFormValues {
  testField: string;
}

// Helper component to wrap TextInput with FormProvider
const TestForm: React.FC<{
  defaultVal?: string;
  validationRules?: any;
  initialError?: FieldError;
}> = ({ defaultVal = '', validationRules = {}, initialError }) => {
  const methods = useForm<TestFormValues>({ defaultValues: { testField: defaultVal } });
  
  // Manually set error if initialError is provided
  if (initialError) {
      methods.setError('testField', initialError);
  }

  return (
    <FormProvider {...methods}>
      <form data-testid="form">
        <TextInput<TestFormValues>
          label="Test Label"
          name="testField"
          register={methods.register}
          errors={methods.formState.errors}
          validationRules={validationRules}
          placeholder="Enter text"
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

describe('TextInput Component', () => {
  it('renders correctly with label and placeholder', () => {
    render(<TestForm />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('registers with react-hook-form and updates value', () => {
    render(<TestForm defaultVal="Initial Value" />);
    const inputElement = screen.getByLabelText('Test Label') as HTMLInputElement;
    expect(inputElement.value).toBe('Initial Value');

    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(inputElement.value).toBe('New Value');
  });

  it('displays validation error message', () => {
    const error: FieldError = { type: 'required', message: 'This field is required' };
    render(<TestForm initialError={error} />);
    
    // Error message should be visible
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    // Input should have error styling (e.g., border-red-500)
    const inputElement = screen.getByLabelText('Test Label');
    expect(inputElement).toHaveClass('border-red-500');
  });

  it('does not display error message when valid', () => {
     render(<TestForm />);
    // No error message should be visible
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
    const inputElement = screen.getByLabelText('Test Label');
    expect(inputElement).not.toHaveClass('border-red-500');
    expect(inputElement).toHaveClass('border-gray-300'); // Default border
  });

  it('applies validation rules (e.g., required)', async () => {
    // This test is more about react-hook-form's behavior which TextInput integrates with.
    // A full test would involve trying to submit the form and checking RHF's errors state.
    // For a unit test of TextInput, showing an error passed via props is sufficient (covered above).
    // Here we ensure validationRules are passed to register.
    
    const mockRegister = jest.fn();
    const methods = {
      register: mockRegister,
      formState: { errors: {} },
      // ... other methods if needed by TextInput directly
    } as any; // Cast to any for simplicity in mock

    const rules = { required: 'Test field is mandatory' };
    render(
      <FormProvider {...methods}>
        <TextInput<TestFormValues>
          label="Test Label"
          name="testField"
          register={methods.register}
          errors={methods.formState.errors}
          validationRules={rules}
        />
      </FormProvider>
    );
    expect(mockRegister).toHaveBeenCalledWith('testField', rules);
  });
});
