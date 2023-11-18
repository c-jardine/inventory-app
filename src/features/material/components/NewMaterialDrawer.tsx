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
  type ButtonProps,
} from '@chakra-ui/react';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { MaterialDrawerContextProvider } from '../contexts';
import { useNewMaterialDrawer } from '../hooks';
import NewMaterialForm from './NewMaterialForm';

type NewMaterialDrawerProps = {
  triggerStyles?: ButtonProps;
};

/**
 * The drawer that shows when creating a new component.
 */
export default function NewMaterialDrawer(props: NewMaterialDrawerProps) {
  // Ref for the drawer trigger so it can be refocused on closing.
  const drawerTriggerRef = React.useRef(null);

  const {
    disclosure: { isOpen, onOpen, onClose },
    form,
    onSubmit,
  } = useNewMaterialDrawer();

  return (
    <>
      <Button
        ref={drawerTriggerRef}
        onClick={onOpen}
        colorScheme='blue'
        leftIcon={<Icon as={IconPlus} w={4} h={4} />}
        {...props.triggerStyles}
      >
        Create new
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={drawerTriggerRef}
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
                <MaterialDrawerContextProvider>
                  <NewMaterialForm />
                </MaterialDrawerContextProvider>
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
