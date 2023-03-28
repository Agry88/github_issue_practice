import React from 'react';

export type DropDownItemProp = {
  children: React.ReactNode;
};

export default function DropDownItem({ children }: DropDownItemProp) {
  return (
    <li>
      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
        {children}
      </span>
    </li>
  );
}
