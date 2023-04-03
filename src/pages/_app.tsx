import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import UserProvider from '@/provider/userProvider';
import Navbar from '@/components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
    </UserProvider>
  );
}
