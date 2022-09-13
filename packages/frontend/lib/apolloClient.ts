import { getClientSideConfig } from './../hooks/useConfig';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCache,
  NormalizedCacheObject,
} from '@apollo/client';
import config from './config';
import { AppProps } from 'next/app';
import { useMemo } from 'react';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: (typeof window === 'undefined' ? config : getClientSideConfig()).api
        .endpoint,
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (
  initialState: NormalizedCacheObject | null = null
): ApolloClient<NormalizedCacheObject> => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    // const data = merge(existingCache, initialState, {
    //   // combine arrays using object equality (like in sets)
    //   arrayMerge: (destinationArray, sourceArray) => [
    //     ...sourceArray,
    //     ...destinationArray.filter((d) =>
    //       sourceArray.every((s) => !isEqual(d, s))
    //     ),
    //   ],
    // })

    const data = { ...existingCache, ...initialState };

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps']
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export const useApollo = (pageProps: AppProps['pageProps']) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
};
