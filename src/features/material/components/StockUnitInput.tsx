import { KFormLabel } from '@/core';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { type CreateMaterialFormType } from '../schema';

type UnitOption = {
  readonly label: string;
  readonly value: string;
};

type GroupOption = {
  readonly label: string;
  readonly options: readonly UnitOption[];
};

const options: readonly GroupOption[] = [
  {
    label: 'Quantity',
    options: [{ label: 'Pieces', value: 'Pieces' }],
  },
  {
    label: 'Weight',
    options: [
      { label: 'Ounces', value: 'Ounces' },
      { label: 'Pounds', value: 'Pounds' },
      { label: 'Grams', value: 'Grams' },
      { label: 'Kilograms', value: 'Kilograms' },
    ],
  },
  {
    label: 'Length',
    options: [
      { label: 'Inches', value: 'Inches' },
      { label: 'Feet', value: 'Feet' },
      { label: 'Yards', value: 'Yards' },
      { label: 'Millimeters', value: 'Millimeters' },
      { label: 'Centimeters', value: 'Centimeters' },
      { label: 'Meters', value: 'Meters' },
    ],
  },
  {
    label: 'Area',
    options: [
      { label: 'Sq. Inches', value: 'Sq. Inches' },
      { label: 'Sq. Feet', value: 'Sq. Feet' },
      { label: 'Sq. Centimeters', value: 'Sq. Centimeters' },
      { label: 'Sq. Meters', value: 'Sq. Meters' },
    ],
  },
  {
    label: 'Volume',
    options: [
      { label: 'Fluid Ounces', value: 'Fluid Ounces' },
      { label: 'Pints', value: 'Pints' },
      { label: 'Quarts', value: 'Quarts' },
      { label: 'Gallons', value: 'Gallons' },
      { label: 'Milliliters', value: 'Milliliters' },
      { label: 'Liters', value: 'Liters' },
    ],
  },
];

export default function StockUnitInput() {
  const form = useFormContext<CreateMaterialFormType>();

  return (
    <FormControl
      isRequired
      isInvalid={!!form.formState.errors.stockUnit}
      gridColumn='4 / span 2'
      fontSize='sm'
    >
      <KFormLabel>Stock Unit</KFormLabel>
      <Controller
        control={form.control}
        name='stockUnit'
        render={({ field }) => (
          <Select<UnitOption, false, GroupOption>
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
            options={options}
            value={options
              .flatMap((group) => group.options)
              .find((unitOption) => unitOption.value === field.value)}
            onChange={(data) => {
              if (data) {
                field.onChange(data.value);
                form.setValue('stockUnit', data.value);
              }
            }}
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
