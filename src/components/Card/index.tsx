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
    'shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]',
    'rounded-xl',
    ...customClassNames,
  ];

  return (
    <div className={listClassNames.join(' ')}>
      {children}
    </div>
  );
}
