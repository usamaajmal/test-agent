import React from 'react';
import { UseFormRegister, FieldErrors, Path, Control } from 'react-hook-form';

interface FormValues {
  [key: string]: any;
}

interface FileInputProps<T extends FormValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  control: Control<T>; // control is needed for watching file input
  validationRules?: any;
  acceptedFormats?: string; // e.g. ".jpg,.jpeg,.png,.pdf"
  maxFileSizeMB?: number;
}

const FileInput = <T extends FormValues>({
  label,
  name,
  register,
  errors,
  control,
  validationRules = {},
  acceptedFormats = '.jpg,.jpeg,.png,.pdf',
  maxFileSizeMB = 6,
}: FileInputProps<T>) => {
  const error = errors[name];

  const validateFile = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return 'This field is required.';
    }
    const file = files[0];
    const fileSizeMB = file.size / (1024 * 1024);
    const fileType = '.' + file.name.split('.').pop()?.toLowerCase();

    if (maxFileSizeMB && fileSizeMB > maxFileSizeMB) {
      return `File size must be less than ${maxFileSizeMB}MB.`;
    }

    if (acceptedFormats && !acceptedFormats.split(',').includes(fileType)) {
      return `Invalid file type. Accepted formats: ${acceptedFormats}.`;
    }
    return true;
  };

  const { ref, ...rest } = register(name, { ...validationRules, validate: validateFile });

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="file"
        id={name}
        {...rest}
        ref={ref}
        accept={acceptedFormats}
        className={`mt-1 block w-full text-sm text-gray-900 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg cursor-pointer bg-gray-50 focus:outline-none 
           file:mr-4 file:py-2 file:px-4
           file:rounded-l-lg file:border-0
           file:text-sm file:font-semibold
           file:bg-indigo-50 file:text-indigo-700
           hover:file:bg-indigo-100`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error.message?.toString()}</p>
      )}
      <p className="mt-1 text-xs text-gray-500">
        Accepted formats: {acceptedFormats}. Max file size: {maxFileSizeMB}MB.
      </p>
    </div>
  );
};

export default FileInput;
