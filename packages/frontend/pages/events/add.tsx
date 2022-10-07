import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
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
import { SearchBoxProps } from '../../components/SearchBox/SearchBox';
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

const VenueSearch: React.FC<{
  error?: SearchBoxProps<VenueSearchResult>['error'];
  onSelect: SearchBoxProps<VenueSearchResult>['onSelect'];
}> = ({ error, onSelect }) => {
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

  return (
    <SearchBox<VenueSearchResult>
      id="venueSearch"
      label="Ort"
      items={venues}
      itemToString={(item) => {
        return item ? item.name : '';
      }}
      onSelect={onSelect}
      onInputValueChange={({ inputValue, selectedItem }) => {
        if (inputValue)
          debouncedSearchVenueQuery({ variables: { term: inputValue } });

        if (onSelect && inputValue !== selectedItem?.name) onSelect(null);
      }}
      isLoading={loading}
      isRequired
      error={error}
    />
  );
};

// TODO: Fix validation of end date before start date
// TODO: Implement creation of new venue
const EventCreateForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting, isDirty, isValid, touchedFields },
  } = useForm<EventCreateFormValues>({
    mode: 'onChange',
    resolver: yupResolver(eventCreateFormValidationSchema),
  });
  const { data } = useEventCategoriesQuery();

  const eventCategories = data?.eventCategories?.data || [];

  const handleVenueSelect = useCallback(
    (value?: VenueSearchResult | null) => {
      setValue('venueId', value?.id || '', {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log(values);
      })}
      noValidate
    >
      <Stack spacing={4} align="stretch">
        <FormControl
          isRequired
          isInvalid={touchedFields.title && !!errors.title}
        >
          <FormLabel>Titel</FormLabel>
          <Input {...register('title')} />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={touchedFields.description && !!errors.description}
        >
          <FormLabel>Beschreibung</FormLabel>
          <Textarea {...register('description')} />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={touchedFields.startDate && !!errors.startDate}
        >
          <FormLabel>Beginn</FormLabel>
          <Input {...register('startDate')} type="datetime-local" step={1800} />
          <FormErrorMessage>
            {errors.startDate && errors.startDate.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={touchedFields.endDate && !!errors.endDate}>
          <FormLabel>Ende</FormLabel>
          <Input {...register('endDate')} type="datetime-local" step={1800} />
          <FormErrorMessage>
            {errors.endDate && errors.endDate.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={touchedFields.categoryId && !!errors.categoryId}
        >
          <FormLabel>Kategorie</FormLabel>
          <Select {...register('categoryId')} placeholder="Kategorie auswählen">
            {eventCategories.map((category) => (
              <option value={category.id as string} key={category.id}>
                {category.attributes?.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.categoryId && errors.categoryId.message}
          </FormErrorMessage>
        </FormControl>
        <VenueSearch error={errors.venueId} onSelect={handleVenueSelect} />
        <Button type="submit" disabled={isSubmitting || !isDirty || !isValid}>
          Erstellen
        </Button>
      </Stack>
    </form>
  );
};

const EventAddPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Event erstellen</title>
      </Head>
      <Heading as="h2" size="lg">
        Event erstellen
      </Heading>
      <Box mt={4} mb={2}>
        <EventCreateForm />
      </Box>
    </>
  );
};

export default EventAddPage;
