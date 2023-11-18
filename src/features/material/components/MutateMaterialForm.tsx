import { KFormLabel, NumberStepper } from '@/core';
import {
  Badge,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { Controller, useFormContext } from 'react-hook-form';

import { useMaterialDrawerContext } from '../hooks';
import { type CreateMaterialFormType } from '../schema';
import CategoryInput from './CategoryInput';
import StockUnitInput from './StockUnitInput';
import VendorInput from './VendorInput';

/**
 * A form for creating and editing materials.
 */
export default function MutateMaterialForm() {
  const context = useMaterialDrawerContext();

  const form = useFormContext<CreateMaterialFormType>();

  return (
    <Stack spacing={5}>
      <FormControl isRequired isInvalid={!!form.formState.errors.name}>
        <KFormLabel>Name</KFormLabel>
        <Input {...form.register('name')} />
        {form.formState.errors.name && (
          <FormErrorMessage>
            {form.formState.errors.name.message}
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!form.formState.errors.url}>
        <KFormLabel>URL</KFormLabel>
        <Input {...form.register('url')} />
        {form.formState.errors.url && (
          <FormErrorMessage>
            {form.formState.errors.url.message}
          </FormErrorMessage>
        )}
      </FormControl>

      <SimpleGrid columns={5} gap={4}>
        <FormControl
          isRequired={context.screen === 'DETAILS'}
          isInvalid={!!form.formState.errors.stock}
          gridColumn='1 / span 3'
        >
          <KFormLabel>Total stock</KFormLabel>
          <Controller
            name='stock'
            control={form.control}
            render={({ field: { ref, ...rest } }) => (
              <NumberInput {...rest} min={0}>
                <NumberInputField
                  ref={ref}
                  name={rest.name}
                  disabled={context.screen === 'EDIT'}
                  _disabled={{
                    bg: 'gray.100',
                  }}
                />
                {context.screen === 'DETAILS' && <NumberStepper />}
              </NumberInput>
            )}
          />
          {form.formState.errors.stock && (
            <FormErrorMessage>
              {form.formState.errors.stock.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <StockUnitInput />
      </SimpleGrid>

      <FormControl isInvalid={!!form.formState.errors.minStock}>
        <KFormLabel>Minimum Stock</KFormLabel>
        <Controller
          name='minStock'
          control={form.control}
          render={({ field: { ref, ...rest } }) => (
            <NumberInput {...rest} position='relative' min={0}>
              <NumberInputField ref={ref} name={rest.name} />
              <NumberStepper />
              <Badge
                position='absolute'
                top='50%'
                right={4}
                transform='translateY(-50%)'
                transition='100ms ease'
                fontWeight='medium'
                _groupHover={{
                  transform: 'translateY(-50%) translateX(-1.5rem)',
                }}
                _groupFocusWithin={{
                  transform: 'translateY(-50%) translateX(-1.5rem)',
                }}
                _groupActive={{
                  transform: 'translateY(-50%) translateX(-1.5rem)',
                }}
              >
                {form.watch('stockUnit')}
              </Badge>
            </NumberInput>
          )}
        />
        {form.formState.errors.minStock && (
          <FormErrorMessage>
            {form.formState.errors.minStock.message}
          </FormErrorMessage>
        )}
      </FormControl>

      <FormControl
        isRequired={context.screen === 'DETAILS'}
        isInvalid={!!form.formState.errors.costPerUnit}
      >
        <KFormLabel>Cost per Unit</KFormLabel>

        <InputGroup>
          <InputLeftElement pointerEvents='none' h='full'>
            <Icon as={IconCurrencyDollar} h='full' />
          </InputLeftElement>
          <NumberInput w='full'>
            <NumberInputField
              {...form.register('costPerUnit', { valueAsNumber: true })}
              disabled={context.screen === 'EDIT'}
              pl={8}
              _disabled={{
                bg: 'gray.100',
              }}
            />
          </NumberInput>
        </InputGroup>
        {form.formState.errors.costPerUnit && (
          <FormErrorMessage>
            {form.formState.errors.costPerUnit.message}
          </FormErrorMessage>
        )}
      </FormControl>

      <VendorInput />
      <CategoryInput />
    </Stack>
  );
}
