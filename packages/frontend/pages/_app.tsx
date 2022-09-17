import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import theme from '../lib/theme';
import App from '../components/App';

function MyApp({ Component, pageProps }: AppProps) {
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
}

export default MyApp;
