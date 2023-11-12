import { KFormLabel } from '@/core';
import { type AppRouter } from '@/server/api/root';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Icon,
  NumberInput,
  NumberInputField,
  Stack,
  Textarea,
  chakra,
} from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons-react';
import { type inferRouterOutputs } from '@trpc/server';
import { Select } from 'chakra-react-select';
import { Controller } from 'react-hook-form';
import { useUpdateStock } from '../hooks';
import { type StockLogTypeOption } from '../hooks/useUpdateStock';
import { getStockLabel, getStockLevel } from '../utils';

type GroupOption = {
  readonly label: string;
  readonly options: readonly StockLogTypeOption[];
};

export default function UpdateStockForm(
  props: inferRouterOutputs<AppRouter>['material']['getAll'][0] & {
    onClose: () => void;
  }
) {
  const { onClose, ...material } = props;
  const { form, onSubmit, types } = useUpdateStock(material, onClose);
  return (
    <>
      <DrawerBody>
        <form
          id={`update-stock-${material.id}-form`}
          onSubmit={form.handleSubmit(onSubmit, (data) => console.error(data))}
        >
          <Stack spacing={4}>
            <FormControl isInvalid={!!form.formState.errors.logType}>
              <KFormLabel>Type</KFormLabel>
              <Controller
                control={form.control}
                name='logType'
                render={({ field }) => (
                  <Select<StockLogTypeOption, false, GroupOption>
                    {...field}
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
                      }),
                    }}
                    options={types}
                    value={types.find((type) => type.value === field.value)}
                    onChange={(data) => {
                      if (data) {
                        field.onChange(data.value);
                        form.setValue('logType', data.value);
                      }
                    }}
                  />
                )}
              />
              {form.formState.errors.logType && (
                <FormErrorMessage>
                  {form.formState.errors.logType.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.stock}>
              <KFormLabel>{getStockLabel(form.watch('logType'))}</KFormLabel>
              <NumberInput>
                <NumberInputField
                  placeholder='0'
                  {...form.register('stock', { valueAsNumber: true })}
                />
              </NumberInput>
              <FormHelperText
                display='flex'
                alignItems='center'
                gap={2}
                fontSize='xs'
                fontWeight='semibold'
              >
                <chakra.span color='gray.500'>
                  {Number(props.stock)}{' '}
                  {Number(props.stock) === 1
                    ? props.stockUnit.abbreviationSingular
                    : props.stockUnit.abbreviationPlural}
                </chakra.span>
                <Icon as={IconArrowRight} />
                {!isNaN(form.watch('stock')) &&
                  getStockLevel(
                    form.watch('logType'),
                    Number(material.stock),
                    form.watch('stock')
                  )}{' '}
                {Number(props.stock) === 1
                  ? props.stockUnit.abbreviationSingular
                  : props.stockUnit.abbreviationPlural}
              </FormHelperText>
              {form.formState.errors.stock && (
                <FormErrorMessage>
                  {form.formState.errors.stock.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!form.formState.errors.notes}>
              <KFormLabel>Notes</KFormLabel>
              <Textarea {...form.register('notes')} />
              {form.formState.errors.stock && (
                <FormErrorMessage>
                  {form.formState.errors.stock.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Stack>
        </form>
      </DrawerBody>
      <DrawerFooter
        display='flex'
        gap={2}
        justifyContent='flex-end'
        borderTopWidth={0}
      >
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          form={`update-stock-${material.id}-form`}
          type='submit'
          colorScheme={form.formState.isValid ? 'green' : 'gray'}
          isDisabled={!form.formState.isDirty}
        >
          Save
        </Button>
      </DrawerFooter>
    </>
  );
}
