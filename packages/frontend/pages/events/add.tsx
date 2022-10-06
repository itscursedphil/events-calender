import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { debounce } from 'lodash';
import { NextPage } from 'next';
import Head from 'next/head';

import { SearchBox } from '../../components/SearchBox';
import {
  useEventCategoriesQuery,
  useSearchVenueLazyQuery,
} from '../../generated/graphql';
import { eventCreateFormValidationSchema } from '../../lib/validation';

interface EventCreateFormValues {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  categoryId: string;
  venueId: string;
}

interface VenueSearchResult {
  id: string;
  name: string;
}

const VenueSearch = () => {
  const [searchVenueQuery, { data, loading }] = useSearchVenueLazyQuery({});
  const debouncedSearchVenueQuery = useCallback(
    debounce(searchVenueQuery, 500),
    []
  );
  const venues: VenueSearchResult[] = [
    ...(data?.venues?.data || []).map((venue) => ({
      id: venue.id || '',
      name: venue.attributes?.name || '',
    })),
    { id: 'new', name: 'Ort hinzufügen' },
  ];

  const handleSelect = useCallback((value: VenueSearchResult) => {
    console.log(value);
  }, []);

  return (
    <SearchBox<VenueSearchResult>
      id="venueSearch"
      label="Ort"
      items={venues}
      itemToString={(item) => {
        return item ? item.name : '';
      }}
      onSelect={handleSelect}
      onInputValueChange={({ inputValue }) => {
        if (inputValue)
          debouncedSearchVenueQuery({ variables: { term: inputValue } });
      }}
      loading={loading}
    />
  );
};

const EventAddPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid, touchedFields },
  } = useForm<EventCreateFormValues>({
    mode: 'onChange',
    // resolver: yupResolver(eventCreateFormValidationSchema),
  });
  const { data } = useEventCategoriesQuery();

  const eventCategories = data?.eventCategories?.data || [];

  return (
    <>
      <Head>
        <title>Event erstellen</title>
      </Head>
      <Heading as="h2" size="lg">
        Event erstellen
      </Heading>
      <Box mt={4}>
        <form
          onSubmit={handleSubmit((values) => {
            console.log(values);
          })}
          noValidate
        >
          <Stack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Titel</FormLabel>
              <Input {...register('title')} />
            </FormControl>
            <FormControl>
              <FormLabel>Beschreibung</FormLabel>
              <Textarea {...register('description')} />
            </FormControl>
            <FormControl>
              <FormLabel>Kategorie</FormLabel>
              <Select
                {...register('categoryId')}
                placeholder="Kategorie auswählen"
              >
                {eventCategories.map((category) => (
                  <option value={category.id as string} key={category.id}>
                    {category.attributes?.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <VenueSearch />
            <Button
              type="submit"
              disabled={isSubmitting || !isDirty || !isValid}
            >
              Erstellen
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default EventAddPage;
