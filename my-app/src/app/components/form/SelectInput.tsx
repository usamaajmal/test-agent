import React from 'react';
import { UseFormRegister, FieldErrors, Path } from 'react-hook-form';

interface FormValues {
  [key: string]: any;
}

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps<T extends FormValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  options: Option[];
  validationRules?: any;
  placeholder?: string;
}

const SelectInput = <T extends FormValues>({
  label,
  name,
  register,
  errors,
  options,
  validationRules = {},
  placeholder = 'Choose an option',
}: SelectInputProps<T>) => {
  const error = errors[name];

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={name}
        {...register(name, validationRules)}
        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md`}
        defaultValue=""
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default SelectInput;
