import React from 'react';
import { Icon } from '@iconify/react';

export default function Navbar() {
  return (
    <nav className="bg-primary flex flex-row justify-between items-center px-2 py-5 w-full h-20 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex flex-row items-center">
        <Icon icon="mdi:github" color="white" fontSize={40} />
        <span className="font-sans text-3xl font-normal text-white">Github-Issues-practice</span>
      </div>
      <div className="flex flex-row items-center">
        <Icon icon="material-symbols:logout" color="white" fontSize={40} />
        <span className="font-sans text-2xl font-normal text-white">Logout</span>
      </div>
    </nav>
  );
}
