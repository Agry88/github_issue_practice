import React from 'react';

type Props = {
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
};

export default function TextInput({
  id, name, placeholder, required,
}: Props) {
  return (
    <input type="text" id={id} name={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required={required} />
  );
}
