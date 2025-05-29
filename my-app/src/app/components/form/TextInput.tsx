import React from 'react';
import { UseFormRegister, FieldErrors, Path } from 'react-hook-form';

interface FormValues {
  [key: string]: any;
}

interface TextInputProps<T extends FormValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  validationRules?: any;
  placeholder?: string;
  type?: string;
}

const TextInput = <T extends FormValues>({
  label,
  name,
  register,
  errors,
  validationRules = {},
  placeholder = '',
  type = 'text',
}: TextInputProps<T>) => {
  const error = errors[name];

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name, validationRules)}
        className={`mt-1 block w-full px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default TextInput;
