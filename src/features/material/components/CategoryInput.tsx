import { KFormLabel, type SelectGroupOption, type SelectOption } from '@/core';
import { chakraStyles } from '@/styles';
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
  type OptionProps,
} from 'chakra-react-select';
import { Controller } from 'react-hook-form';
import { useCategories } from '../hooks';

/**
 * Input for selecting categories.
 */
export default function CategoryInput() {
  const { form, onCreate, categories } = useCategories();

  if (!categories) {
    return <Spinner />;
  }

  // Map categories into required format for the select input.
  const categoriesData: SelectOption[] = categories.map((category) => ({
    label: category.name,
    value: category.name,
  }));

  return (
    <FormControl
      isInvalid={!!form.formState.errors.categories}
      gridColumn='4 / span 2'
      fontSize='sm'
    >
      <KFormLabel>Category</KFormLabel>
      <Controller
        control={form.control}
        name='categories'
        render={({ field }) => (
          <CreatableSelect<SelectOption, true, SelectGroupOption>
            {...field}
            isMulti
            value={categoriesData.filter((category) =>
              field.value?.includes(category.value)
            )}
            onChange={(selected) => {
              form.setValue(
                'categories',
                selected.map((item) => item.value)
              );
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
            chakraStyles={chakraStyles}
            options={categoriesData}
          />
        )}
      />
      {form.formState.errors.categories && (
        <FormErrorMessage>
          {form.formState.errors.categories.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

/**
 * Custom input for the select option.
 * @param props The react-select option props (OptionProps).
 */
function CustomOption(
  props: OptionProps<SelectOption, true, SelectGroupOption>
) {
  const utils = api.useUtils();
  const query = api.category.delete.useMutation({
    onSettled: async () => {
      await utils.category.getAll.invalidate();
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
