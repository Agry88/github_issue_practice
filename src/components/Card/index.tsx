import React from 'react';

type CardProps = {
  children: React.ReactNode;
  classNames?: String
};

export default function Card({ children, classNames }: CardProps) {
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
    ...customClassNames,
  ];
  return (
    <div className={listClassNames.join(' ')}>
      {children}
    </div>
  );
}
