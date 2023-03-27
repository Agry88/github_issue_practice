import React, { useEffect } from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

export default function RedirectPage({ acessToken }: { acessToken: string }) {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('accessToken', acessToken);
    router.push('/mainpage');
  }, [acessToken, router]);

  return (
    <>
      <Head>
        <title>正在為您切換頁面中</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        正在為您切換頁面中...
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { acessToken } = context.query;
  const formattedAcessToken = typeof (acessToken) === 'string' ? acessToken : '';
  if (formattedAcessToken === '') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      acessToken: formattedAcessToken,
    },
  };
}