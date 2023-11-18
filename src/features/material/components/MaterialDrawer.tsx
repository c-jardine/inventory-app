import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { MaterialDrawerContextProvider } from '../contexts';
import { type MaterialFullType } from '../types';
import { isLowStock } from '../utils';
import MaterialDetails from './MaterialDetails';
import MaterialDetailsHeader from './MaterialDetailsHeader';
import UpdateMaterialForm from './UpdateMaterialForm';

/**
 * The drawer for an individual material.
 * @param props The material data.
 */
export default function MaterialDrawer(props: MaterialFullType) {
  // State to handle which content is shown. The editing form is shown if true,
  // otherwise the details section is shown.

  // For configuring the drawer.
  const btnRef = React.useRef(null);
  const { isOpen, onClose, onOpen } = useDisclosure({
    onClose: () => {
      // Reset drawer to details section when onClose fires.
      // setIsEditing(false);
    },
  });

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        variant='link'
        px={0}
        fontSize='md'
        fontWeight='semibold'
        color={isLowStock(props) ? 'red.500' : 'black'}
        cursor='pointer'
        _hover={{
          textDecoration: 'underline',
          textUnderlineOffset: 4,
        }}
      >
        {props.name}
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        size='md'
      >
        <DrawerOverlay />
        <DrawerContent>
          <MaterialDetailsHeader {...props} />
          <MaterialDrawerContextProvider>
            <MaterialDetails {...props} />
            <UpdateMaterialForm {...props} />
          </MaterialDrawerContextProvider>
        </DrawerContent>
      </Drawer>
    </>
  );
}
