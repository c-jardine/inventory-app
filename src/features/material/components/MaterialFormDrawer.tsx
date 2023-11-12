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
} from '@chakra-ui/react';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useCreateMaterial } from '../hooks';
import MaterialForm from './MaterialForm';

export default function MaterialFormDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => form.reset(),
  });
  const { form, onSubmit } = useCreateMaterial(onClose);

  const btnRef = React.useRef(null);

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
