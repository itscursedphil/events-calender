import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import {
  Divider,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

import {
  useVenuesQuery,
  VenuesDocument,
  VenuesQuery,
  VenuesQueryVariables,
} from '../../generated/graphql';
import { addApolloState, createApolloClient } from '../../lib/apolloClient';
import { createSlugFromString } from '../../lib/slug';
import { mapVenueQueryResult, Venue } from '../../lib/venue';

const initialQueryLimit = 20;

const VenuesPage: NextPage = () => {
  const { data } = useVenuesQuery();

  const venues: Venue[] = (data?.venues?.data || []).map(mapVenueQueryResult);

  return (
    <>
      <Head>
        <title>Venues</title>
      </Head>
      <Heading as="h2" size="lg">
        Venues
      </Heading>
      <Stack divider={<Divider />} spacing={4} mt={4}>
        {venues.map((venue) => (
          <LinkBox key={venue.id}>
            <Heading as="h3" size="md">
              <NextLink
                href={`/venues/${createSlugFromString(venue.name, venue.id)}`}
                passHref
                legacyBehavior
              >
                <LinkOverlay>{venue.name}</LinkOverlay>
              </NextLink>
            </Heading>
            <Stack direction="row" align="center" spacing={1} mt={2}>
              <Icon as={FiMapPin} />
              <Text as="span" fontSize="sm">
                {`${venue.address.street} ${venue.address.streetNumber}, ${venue.address.postcode} Hannover`}
              </Text>
            </Stack>
          </LinkBox>
        ))}
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Revalidate every 10 minutes
  const revalidate = 10 * 60;

  try {
    const apolloClient = createApolloClient();

    await apolloClient.query<VenuesQuery, VenuesQueryVariables>({
      query: VenuesDocument,
      variables: {
        limit: initialQueryLimit,
      },
      fetchPolicy: 'network-only',
    });

    return { ...addApolloState(apolloClient, { props: {} }) };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return {
      props: {},
      revalidate,
    };
  }
};

export default VenuesPage;
