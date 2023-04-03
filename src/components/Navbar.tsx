import React from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/signup');
  };

  return (
    <nav className="bg-primary flex flex-row justify-between items-center px-2 py-5 w-full h-20 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
      <button
        type="button"
        className="flex flex-row items-center"
        onClick={() => router.push('/issue')}
      >
        <Icon icon="mdi:github" color="white" fontSize={40} />
        <span className="font-sans text-3xl font-normal text-white">Github-Issues-practice</span>
      </button>
      <button
        type="button"
        className="flex flex-row items-center"
        onClick={handleLogout}
      >
        <Icon icon="material-symbols:logout" color="white" fontSize={40} />
        <span className="font-sans text-2xl font-normal text-white">Logout</span>
      </button>
    </nav>
  );
}
