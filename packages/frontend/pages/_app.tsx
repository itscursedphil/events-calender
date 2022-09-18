import 'dayjs/locale/de';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import type { AppProps } from 'next/app';

import App from '../components/App';
import { useApollo } from '../lib/apolloClient';
import theme from '../lib/theme';

dayjs.locale('de');

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <App>
          <Component {...pageProps} />
        </App>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
