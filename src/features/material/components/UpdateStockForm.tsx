import { KFormLabel } from '@/core';
import { type AppRouter } from '@/server/api/root';
import { api } from '@/utils/api';
import {
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
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { type UpdateStockFormType } from './UpdateStockDrawer';

type StockLogTypeOption = {
  readonly label: string;
  readonly value: string;
};

type GroupOption = {
  readonly label: string;
  readonly options: readonly StockLogTypeOption[];
};

export default function UpdateStockForm(
  props: inferRouterOutputs<AppRouter>['material']['getAll'][0]
) {
  const [types, setTypes] = React.useState<StockLogTypeOption[]>([]);
  const { control, register, setValue, watch, resetField, formState } =
    useFormContext<UpdateStockFormType>();

  const { data: logTypes } = api.materialStockLogType.getAll.useQuery();

  React.useEffect(() => {
    if (logTypes) {
      setTypes(
        logTypes?.map((type) => ({ label: type.name, value: type.name }))
      );
      logTypes[0] && resetField('logType', { defaultValue: logTypes[0].name });
    }
  }, [resetField, logTypes]);

  function getStockLabel() {
    switch (watch('logType')) {
      case 'Supply Order':
        return 'Quantity';
      case 'Audit':
        return 'Quantity';
      case 'Product Testing':
        return 'Quantity Used';
      default:
        return 'Quantity';
    }
  }

  function getStockLevel() {
    switch (watch('logType')) {
      case 'Supply Order':
        return (Number(props.stock) + watch('stock')).toFixed(2);
      case 'Audit':
        return watch('stock').toFixed(2);
      case 'Product Testing':
        return (Number(props.stock) - watch('stock')).toFixed(2);
      default:
        return watch('stock').toFixed(2);
    }
  }

  return (
    <Stack spacing={4}>
      <FormControl isInvalid={!!formState.errors.logType}>
        <KFormLabel>Type</KFormLabel>
        <Controller
          control={control}
          name='logType'
          render={({ field }) => (
            <Select<StockLogTypeOption, false, GroupOption>
              {...field}
              // isSearchable={false}
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
                  setValue('logType', data.value);
                }
              }}
            />
          )}
        />
        {formState.errors.logType && (
          <FormErrorMessage>
            {formState.errors.logType.message}
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!formState.errors.stock}>
        <KFormLabel>{getStockLabel()}</KFormLabel>
        <NumberInput>
          <NumberInputField
            placeholder='0'
            {...register('stock', { valueAsNumber: true })}
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
          {!isNaN(watch('stock')) && getStockLevel()}{' '}
          {Number(props.stock) === 1
            ? props.stockUnit.abbreviationSingular
            : props.stockUnit.abbreviationPlural}
        </FormHelperText>
        {formState.errors.stock && (
          <FormErrorMessage>{formState.errors.stock.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={!!formState.errors.notes}>
        <KFormLabel>Notes</KFormLabel>
        <Textarea {...register('notes')} />
        {formState.errors.stock && (
          <FormErrorMessage>{formState.errors.stock.message}</FormErrorMessage>
        )}
      </FormControl>
    </Stack>
  );
}
