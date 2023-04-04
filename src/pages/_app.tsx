import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import UserProvider from '@/provider/userProvider';
import Navbar from '@/components/Navbar';
import AlertProvider from '@/provider/alertProvider';
import Alert from '@/components/Alert/Alert';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider>
      <Alert />
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
      </UserProvider>
    </AlertProvider>
  );
}
