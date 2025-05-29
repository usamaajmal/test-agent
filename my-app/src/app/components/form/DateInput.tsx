import React from 'react';
import { UseFormRegister, FieldErrors, Path } from 'react-hook-form';

interface FormValues {
  [key: string]: any;
}

interface DateInputProps<T extends FormValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  validationRules?: any;
  // dateFormat is for documentation/reminder purposes for now,
  // as native date input's display format is locale-dependent.
  // The value is always yyyy-mm-dd.
  dateFormat?: 'dd-mm-yyyy' | 'yyyy-mm-dd';
}

const DateInput = <T extends FormValues>({
  label,
  name,
  register,
  errors,
  validationRules = {},
  dateFormat = 'yyyy-mm-dd', // Default, also native value format
}: DateInputProps<T>) => {
  const error = errors[name];

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {dateFormat && <span className="text-xs text-gray-500">({dateFormat})</span>}
      </label>
      <input
        type="date"
        id={name}
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

export default DateInput;
