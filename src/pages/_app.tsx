import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import UserProvider from '@/provider/userProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
