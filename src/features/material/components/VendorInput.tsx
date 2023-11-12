import { KFormLabel } from '@/core';
import { api } from '@/utils/api';
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spinner,
} from '@chakra-ui/react';
import { IconTrashXFilled } from '@tabler/icons-react';
import {
  CreatableSelect,
  chakraComponents,
  type GroupBase,
  type OptionProps,
} from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { type MaterialFormType } from '../types';

type VendorOption = {
  __isNew__?: boolean;
  readonly label: string;
  readonly value: string;
};

export default function VendorInput() {
  const form = useFormContext<MaterialFormType>();

  const utils = api.useUtils();
  const { data } = api.vendor.getAll.useQuery();
  const createQuery = api.vendor.create.useMutation({
    onSuccess: (data) => {
      form.setValue('vendor', data.name);
    },
    onSettled: async () => {
      await utils.vendor.getAll.invalidate();
    },
  });

  function onCreate(name: string) {
    createQuery.mutate({ name: name });
  }

  if (!data) {
    return <Spinner />;
  }

  const vendors = data.map((vendor) => ({
    label: vendor.name,
    value: vendor.name,
  }));

  return (
    <FormControl
      isRequired
      isInvalid={!!form.formState.errors.vendor}
      gridColumn='4 / span 2'
      fontSize='sm'
    >
      <KFormLabel>Vendor</KFormLabel>
      <Controller
        control={form.control}
        name='vendor'
        render={({ field }) => (
          <CreatableSelect<VendorOption, false>
            {...field}
            value={vendors.find((vendor) => vendor.value === field.value)}
            onChange={(data) => {
              if (data) {
                field.onChange(data.value);
                form.setValue('vendor', data.value);
              }
            }}
            onCreateOption={onCreate}
            menuPosition='fixed'
            components={{
              Option: CustomOption,
            }}
            styles={{
              menuPortal: (base) => ({
                ...base,
                left: 24,
              }),
            }}
            chakraStyles={{
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
            }}
            options={vendors}
          />
        )}
      />
      {form.formState.errors.stockUnit && (
        <FormErrorMessage>
          {form.formState.errors.stockUnit.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

function CustomOption(
  props: OptionProps<VendorOption, false, GroupBase<VendorOption>>
) {
  const utils = api.useUtils();
  const query = api.vendor.delete.useMutation({
    onSettled: async () => {
      await utils.vendor.getAll.invalidate();
    },
  });

  return (
    <Box position='relative'>
      <Flex
        as={chakraComponents.Option}
        justifyContent='space-between'
        alignItems='center'
        {...props}
      >
        {props.children}
      </Flex>
      {!props.data.__isNew__ && (
        <Menu>
          <MenuButton
            as={IconButton}
            isActive={true}
            onClick={(e) => {
              e.preventDefault();
              if (
                confirm(`Are you sure you want to delete ${props.data.label}?`)
              ) {
                query.mutate({ name: props.data.value });
              }
            }}
            icon={<IconTrashXFilled width={16} height={16} />}
            position='absolute'
            right={4}
            top='50%'
            transform='translateY(-50%)'
            zIndex={10}
            isRound
            bg='transparent'
            size='sm'
            color='gray.500'
            transition='200ms ease'
            _hover={{
              bg: 'gray.300',
              color: 'black',
            }}
          >
            Edit
          </MenuButton>
          <Portal>
            <MenuList display='block' visibility='visible'>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      )}
    </Box>
  );
}
