import React from 'react';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  classNames?: string;
};

export default function Button({ onClick, children, classNames }: Props) {
  return (
    <button onClick={onClick} className={`w-20 inline-block text-gray-500 hover:text-gray-50 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm p-1.5 ${classNames}`} type="button">
      {children}
    </button>
  );
}
