import React from 'react';

export type DropDownItemProp = {
  children: React.ReactNode;
  isSelected?: boolean
  onClick?: () => void;
};

export default function DropDownItem({ children, isSelected, onClick }: DropDownItemProp) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${isSelected ? 'bg-gray-300' : ''}`}
      >
        {children}
      </button>
    </li>
  );
}
