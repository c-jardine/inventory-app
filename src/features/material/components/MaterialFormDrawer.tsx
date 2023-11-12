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
import { materialSchema } from '../schema';
import { type MaterialFormType } from '../types';
import MaterialForm from './MaterialForm';

export default function MaterialFormDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  const form = useForm<MaterialFormType>({
    defaultValues: {
      stock: 0,
      minStock: 0,
      costPerUnit: 0,
    },
    resolver: zodResolver(materialSchema),
  });

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.material.create.useMutation({
    onSuccess: async (data) => {
      toast({
        title: data.name,
        description: `Material successfully created.`,
        status: 'success',
      });
      onClose();
      await utils.material.getAll.invalidate();
    },
  });

  function onSubmit(data: MaterialFormType) {
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
          <form
            onSubmit={form.handleSubmit(onSubmit, (data) =>
              console.error(data)
            )}
          >
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Create new material</DrawerHeader>
              <DrawerBody>
                <MaterialForm />
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
