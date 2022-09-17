import { Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import useCurrentUserStore from '../hooks/useCurrentUser';

const Home: NextPage = () => {
  const user = useCurrentUserStore((state) => state.user);

  return (
    <>
      <Head>
        <title>Events Calendar</title>
      </Head>
      <Heading as="h2" size="lg">
        Home
      </Heading>
      {user && <p>{user.username}</p>}
    </>
  );
};

export default Home;
