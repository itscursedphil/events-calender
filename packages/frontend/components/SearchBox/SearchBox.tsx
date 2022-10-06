import React, { PropsWithChildren, useEffect } from 'react';
import {
  Box,
  FormControl,
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
> & { label: string; loading?: boolean; onSelect?: (item: Item) => void };

const SearchBox: <Item>(props: SearchBoxProps<Item>) => JSX.Element = ({
  id,
  onInputValueChange,
  items,
  label,
  itemToString,
  loading,
  onSelect,
}) => {
  const {
    isOpen,
    inputValue,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    onInputValueChange,
    items,
    itemToString,
    id,
  });

  useEffect(() => {
    if (selectedItem && onSelect) onSelect(selectedItem);
  }, [onSelect, selectedItem]);

  return (
    <FormControl>
      <FormLabel {...getLabelProps()}>{label}</FormLabel>
      <Box {...getComboboxProps()}>
        <InputGroup>
          <Input {...getInputProps()} />
          {typeof loading !== 'undefined' && (
            <InputRightElement>
              <Spinner size="xs" visibility={loading ? 'initial' : 'hidden'} />
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
    </FormControl>
  );
};

export default SearchBox;
