import theme from '@/themes';
import React from 'react';

export default function Navbar() {
  const { colors } = theme;

  return (
    <nav className={`bg-[${colors.primary}] flex flex-row justify-between items-center px-2 py-5 w-full h-20 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]`}>
      <div className="flex flex-row">
        <span>Logo</span>
        <span className="font-sans text-3xl font-normal text-white">Github-Issues-practice</span>
      </div>
      <div className="flex flex-row">
        <span>Logo</span>
        <span className="font-sans text-2xl font-normal text-white">Logout</span>
      </div>
    </nav>
  );
}
