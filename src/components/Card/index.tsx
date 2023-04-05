import React from 'react';

type CardProps = {
  children: React.ReactNode;
  classNames?: String
  onClick?: () => void
};

export default function Card({ children, classNames, onClick }: CardProps) {
  const customClassNames = classNames ? classNames.split(' ') : [];
  const listClassNames: string[] = [
    'bg-white',
    'flex',
    'flex-col',
    'justify-between',
    'items-center',
    'px-2',
    'py-5',
    'w-80',
    'h-80',
    'rounded-xl',
    'border-2',
    'border-slate-50',
    onClick ? 'cursor-pointer' : 'cursor-auto',
    ...customClassNames,
  ];
  return (
    <button
      type="button"
      className={listClassNames.join(' ')}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
