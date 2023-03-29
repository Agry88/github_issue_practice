import React from 'react';

type Props = {
  label: string
  children?: React.ReactNode
};

export default function Label({ label, children }: Props) {
  return (
    <label htmlFor={label} className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
      {label}
      {children}
    </label>
  );
}
