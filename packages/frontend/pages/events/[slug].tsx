import React, { useCallback, useEffect } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import {
  Box,
  Button,
  Heading,
  Icon,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  EventCategoryBadge,
  EventStartDateWithIcon,
} from '../../components/Event';
import { VenueLinkWithIcon } from '../../components/Venue';
import {
  EventDocument,
  EventPathsDocument,
  EventPathsQuery,
  EventPathsQueryVariables,
  EventQuery,
  EventQueryVariables,
  useEventAttendingStatusLazyQuery,
  useEventQuery,
  useUpdateEventAttendingMutation,
} from '../../generated/graphql';
import useCurrentUserStore from '../../hooks/useCurrentUser';
import { addApolloState, createApolloClient } from '../../lib/apolloClient';
import { Event, mapEventQueryResult } from '../../lib/event';
import { createSlugFromString, getIdFromSlug } from '../../lib/slug';

// TODO: Finish
const AttendEventSelect: React.FC<{ id: Event['id'] }> = ({ id }) => {
  const { user, loading, initialized } = useCurrentUserStore((state) => ({
    user: state.user,
    loading: state.loading,
    initialized: state.initialized,
  }));
  const [
    eventStatusQuery,
    {
      data,
      loading: attendingStatusLoading,
      previousData,
      refetch: refetchEventAttendingStatus,
    },
  ] = useEventAttendingStatusLazyQuery({ variables: { id } });
  const router = useRouter();
  const [updateEventAttendingMutation] = useUpdateEventAttendingMutation();

  useEffect(() => {
    eventStatusQuery();
  }, [eventStatusQuery]);

  const isAttending = (data || previousData)?.event?.data?.attributes
    ?.attending;

  const handleButtonClick = useCallback(async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    const nextAttending = !isAttending;

    await updateEventAttendingMutation({
      variables: { eventId: id, attending: nextAttending },
      optimisticResponse: { updateEventAttending: nextAttending },
    });
    refetchEventAttendingStatus();
  }, [
    id,
    isAttending,
    refetchEventAttendingStatus,
    router,
    updateEventAttendingMutation,
    user,
  ]);

  return (
    <Skeleton
      isLoaded={
        initialized && !loading && (!attendingStatusLoading || !!previousData)
      }
    >
      {isAttending ? (
        <Button
          rightIcon={<Icon as={FiX} />}
          variant="outline"
          size="sm"
          onClick={handleButtonClick}
        >
          Absagen
        </Button>
      ) : (
        <Button
          rightIcon={<Icon as={FiPlus} />}
          size="sm"
          onClick={handleButtonClick}
        >
          Teilnehmen
        </Button>
      )}
    </Skeleton>
  );
};

const EventPage: NextPage<Event> = ({ id }) => {
  const { data } = useEventQuery({
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  const eventData = data?.event?.data;

  // TODO: Fix
  if (!eventData) return null;

  const { title, category, startDate, venue, description } =
    mapEventQueryResult<typeof eventData, Event>(eventData);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box mb={2}>
        <EventCategoryBadge {...category} />
      </Box>
      <Heading as="h2" size="lg">
        {title}
      </Heading>
      <Box my={4}>
        <Stack spacing={2}>
          <EventStartDateWithIcon startDate={startDate} />
          <VenueLinkWithIcon {...venue} />
        </Stack>
      </Box>
      <Box my={4} display="flex">
        <AttendEventSelect id={id} />
      </Box>
      <Text>{description}</Text>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const apolloClient = createApolloClient();

  try {
    const startDate = dayjs().subtract(30, 'days');

    const { data } = await apolloClient.query<
      EventPathsQuery,
      EventPathsQueryVariables
    >({
      query: EventPathsDocument,
      variables: {
        limit: 100,
        startDate,
      },
      fetchPolicy: 'network-only',
    });

    if (!data.events?.data) throw new Error('Error fetching event paths');

    const slugs = data.events?.data
      .map((event) => {
        if (!event.id || !event.attributes?.title) return '';

        return createSlugFromString(event.attributes.title, event.id);
      })
      .filter((val) => !!val);

    return {
      paths: slugs.map((slug) => ({ params: { slug } })),
      fallback: 'blocking',
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<Event, { slug: string }> = async (
  ctx
) => {
  const apolloClient = createApolloClient();

  const id = getIdFromSlug(ctx.params?.slug || '');

  const { data } = await apolloClient.query<EventQuery, EventQueryVariables>({
    query: EventDocument,
    variables: {
      id,
    },
    fetchPolicy: 'network-only',
  });

  const eventData = data.event?.data;

  if (!eventData) {
    throw new Error('Error fetching event');
  }

  const event = mapEventQueryResult<typeof eventData, Event>(eventData);

  return {
    ...addApolloState(apolloClient, {
      props: event,
    }),
    // Revalidate every 60 minutes
    revalidate: 60 * 60,
  };
};

export default EventPage;
