import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import Header from '../Header';
import Main from '../Main';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  </div>
);

export default Layout;
