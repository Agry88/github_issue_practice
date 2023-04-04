import React, { useEffect } from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

export default function RedirectPage({ acessToken }: { acessToken: string }) {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('accessToken', acessToken);
    router.push('/issue');
  }, [acessToken, router]);

  return (
    <>
      <Head>
        <title>Github Issue Practice - Redirecting...</title>
      </Head>
      <main>
        Redirecting...
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
        destination: '/issue',
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
