import React, { useEffect } from 'react';
import { Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import useCurrentUserStore from '../../hooks/useCurrentUser';

const logout = async () => {
  await fetch('/api/logout');
};

const LogoutPage: NextPage = () => {
  const router = useRouter();
  const resetUser = useCurrentUserStore((state) => state.resetUser);

  useEffect(() => {
    resetUser();
    logout().then(() => router.push('/'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Logout</title>
      </Head>
      <Heading as="h2" size="lg">
        Logout
      </Heading>
    </>
  );
};

export default LogoutPage;
