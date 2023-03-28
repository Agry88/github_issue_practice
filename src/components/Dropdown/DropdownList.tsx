import React from 'react';

export type DropDownListProp = {
  children: React.ReactNode;
};

export default function DropDownList({ children }: DropDownListProp) {
  return (
    <ul className="py-2">
      {children}
    </ul>
  );
}
