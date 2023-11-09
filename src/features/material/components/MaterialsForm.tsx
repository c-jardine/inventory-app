import { Validation } from '@/core';
import { api } from '@/utils/api';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import MaterialDetailsForm from './MaterialDetailsForm';

const schema = z.object({
  name: z.string().min(1, Validation.MIN_CHARS(1)),
  url: z.union([
    z.string().url(Validation.VALID_URL).optional(),
    z.literal(''),
  ]),
  stock: z
    .number({ invalid_type_error: Validation.REQUIRED })
    .min(0, Validation.NOT_NEGATIVE),
  stockUnit: z.string(),
  minStock: z
    .union([
      z
        .number({ invalid_type_error: Validation.REQUIRED })
        .min(0, Validation.NOT_NEGATIVE),
      z.nan(),
    ])
    .optional(),
  costPerUnit: z
    .number({ invalid_type_error: Validation.REQUIRED })
    .min(0, Validation.NOT_NEGATIVE),
  vendor: z.string(),
  categories: z.string().array().optional(),
});

export type MaterialsForm = z.infer<typeof schema>;

export default function MaterialsForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  const form = useForm<MaterialsForm>({
    defaultValues: {
      stock: 0,
      minStock: 0,
      costPerUnit: 0,
    },
    resolver: zodResolver(schema),
  });

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.material.create.useMutation({
    onSuccess: (data) => {
      toast({
        title: 'Material created',
        description: `Created the material: ${data.name}`,
        status: 'success',
      });
      onClose();
    },
    onSettled: async () => {
      await utils.material.getAll.invalidate();
    },
  });

  function onSubmit(data: MaterialsForm) {
    query.mutate(data);
  }

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        colorScheme='blue'
        leftIcon={<Icon as={IconPlus} w={4} h={4} />}
      >
        Create new
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        placement='right'
        size='md'
      >
        <DrawerOverlay />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Create new material</DrawerHeader>
              <DrawerBody>
                <MaterialDetailsForm />
              </DrawerBody>
              <DrawerFooter>
                <Button type='submit' colorScheme='green'>
                  Save
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </form>
        </FormProvider>
      </Drawer>
    </>
  );
}
