import { type SelectGroupOption, type SelectOption } from '@/core';
import { type ChakraStylesConfig } from 'chakra-react-select';

export const chakraStyles: ChakraStylesConfig<
  SelectOption,
  boolean,
  SelectGroupOption
> = {
  container: (base) => ({
    ...base,
    cursor: 'pointer',
  }),
  valueContainer: (base) => ({
    ...base,
    py: '0.625rem',
  }),
  menuList: (base) => ({
    ...base,
    rounded: 'lg',
    p: 2,
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'gray.600',
    fontSize: 'xs',
    transition: '200ms ease',
    _groupHover: {
      color: 'black',
    },
  }),
  groupHeading: (base) => ({
    ...base,
    fontSize: 'xs',
    fontWeight: 'semibold',
    color: 'gray.400',
    textTransform: 'uppercase',
    p: 2,
    cursor: 'default',
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    bg: 'transparent',
    px: 2,
    color: 'gray.500',
    transition: '200ms ease',
    _groupHover: {
      color: 'black',
    },
    _groupFocusWithin: {
      color: 'black',
    },
  }),
  option: (base) => ({
    ...base,
    fontSize: 'sm',
    rounded: 'md',
    p: '0.75rem 1rem',
    _selected: {
      bg: 'gray.200',
    },
  }),
};
