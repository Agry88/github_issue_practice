import React from 'react';

type Props = {
  id?: string;
  name?: string;
  rows?: number;
  placeholder?: string;
  defaultValue?: string
  required?: boolean;
};

export default function TextArea({
  id, name, rows, placeholder, required, defaultValue,
}: Props) {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      defaultValue={defaultValue}
      required={required}
    />
  );
}
