import React from 'react';

type Props = {
  label: string
  description?: string
  children?: React.ReactNode
};

export default function Label({ label, children, description }: Props) {
  return (
    <label htmlFor={label} className="flex flex-col mb-2 text-2xl font-medium text-gray-600">
      {label}
      {description && (
        <span className="ml-4 text-sm text-gray-400">
          {description}
        </span>
      )}
      {children}
    </label>
  );
}
