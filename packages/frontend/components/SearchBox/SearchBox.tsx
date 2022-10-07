import React, { PropsWithChildren, useState } from 'react';
import { FieldError } from 'react-hook-form';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import { useCombobox, UseComboboxProps } from 'downshift';

const SearchBoxResults: React.FC<PropsWithChildren> = ({ children }) => (
  <Box
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    bg="gray.900"
    width="100%"
    maxHeight="10rem"
    overflowX="hidden"
    overflowY="auto"
  >
    <Box p={2}>{children}</Box>
  </Box>
);

export type SearchBoxProps<Item> = Pick<
  UseComboboxProps<Item>,
  'id' | 'onInputValueChange' | 'items' | 'itemToString'
> & {
  label: string;
  isLoading?: boolean;
  isRequired?: boolean;
  error?: FieldError;
  onSelect?: (item: Item | null | undefined) => void;
};

const SearchBox: <Item>(props: SearchBoxProps<Item>) => JSX.Element = ({
  id,
  onInputValueChange,
  items,
  label,
  itemToString,
  isLoading,
  error,
  onSelect,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const {
    isOpen,
    inputValue,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    onInputValueChange,
    items,
    itemToString,
    id,
    onSelectedItemChange: ({ selectedItem }) =>
      onSelect ? onSelect(selectedItem) : undefined,
    onStateChange: ({
      inputValue: currentInputValue,
      isOpen: currentIsOpen,
    }) => {
      if (!!currentInputValue || (currentIsOpen && !isTouched))
        setIsTouched(true);
    },
  });

  return (
    <FormControl isRequired isInvalid={isTouched && !!error}>
      <FormLabel {...getLabelProps()}>{label}</FormLabel>
      <Box {...getComboboxProps()}>
        <InputGroup>
          <Input {...getInputProps()} />
          {typeof isLoading !== 'undefined' && (
            <InputRightElement>
              <Spinner
                size="xs"
                visibility={isLoading ? 'initial' : 'hidden'}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </Box>
      <Box {...getMenuProps()} position="absolute" width="100%" zIndex={1000}>
        {isOpen && inputValue && (
          <SearchBoxResults>
            {items.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div {...getItemProps({ item, index })} key={index}>
                <Box
                  p={2}
                  borderRadius="lg"
                  bg={highlightedIndex === index ? 'gray.800' : 'transparent'}
                >
                  {itemToString ? itemToString(item) : ''}
                </Box>
              </div>
            ))}
          </SearchBoxResults>
        )}
      </Box>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default SearchBox;
