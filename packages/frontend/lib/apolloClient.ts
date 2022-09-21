import { useMemo } from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  TypePolicies,
} from '@apollo/client';
import { AppProps } from 'next/app';

import { getClientSideConfig } from '../hooks/useConfig';
import config from './config';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const getClientJwt = () => {
  if (typeof window === 'undefined') return undefined;

  const clientJwt = window.localStorage.getItem('');

  if (!clientJwt) return undefined;

  return `Bearer ${clientJwt}`;
};

/* We need to apply cache policies to always merge the entity assigned to
 * 'attributes' into the parent type entity. This is because of a design flaw in
 * Strapi v4 that puts an entity into the 'attributes' property of an abstract
 * parent entity. Because only the parent entity holds the entity id, which is
 * the same for both, Apollo is unable to cache the entity assigned to
 * 'attributes'.
 *
 * Example:
 *
 * query event: EventEntityResponse {
 *    data: EventEntity {
 *      id
 *      attributes: Event {
 *        title
 *        ...
 *      }
 *    }
 * }
 *
 * See: https://forum.strapi.io/t/discussion-regarding-the-complex-response-structure-for-rest-graphql-developer-experience/13400 */
const createApolloCacheTypePolicies = (typenames: string[]) =>
  typenames.reduce<TypePolicies>((typePolicies, typename) => {
    return {
      [`${typename}Entity`]: {
        fields: {
          attributes: {
            merge: true,
          },
        },
      },
      ...typePolicies,
    };
  }, {});

export const createApolloClient = (jwt?: string) => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: (typeof window === 'undefined' ? config : getClientSideConfig()).api
        .endpoint,
      credentials: 'include',
      // headers: {
      //   Authorization: jwt ? `Bearer ${jwt}` : getClientJwt(),
      // },
    }),
    cache: new InMemoryCache({
      typePolicies: createApolloCacheTypePolicies([
        'Event',
        'EventCategory',
        'Venue',
      ]),
    }),
  });
};

export const initializeApollo = (
  initialState: NormalizedCacheObject | null = null
): ApolloClient<NormalizedCacheObject> => {
  // eslint-disable-next-line no-underscore-dangle
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
  pageProps: AppProps<{ props: any }>['pageProps']
) => {
  if (pageProps?.props) {
    // eslint-disable-next-line no-param-reassign
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export const useApollo = (pageProps: AppProps<any>['pageProps']) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
};
