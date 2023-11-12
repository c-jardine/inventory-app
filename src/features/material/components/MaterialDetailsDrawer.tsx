import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { type Material } from '@prisma/client';
import React from 'react';
import { type MaterialFullType } from '../types';
import MaterialDetails from './MaterialDetails';
import MaterialDetailsEditForm from './MaterialDetailsEditForm';
import MaterialDetailsHeader from './MaterialDetailsHeader';

export default function MaterialDetailsDrawer(props: MaterialFullType) {
  const [isEditing, setIsEditing] = React.useState(false);
  const btnRef = React.useRef(null);

  const { isOpen, onClose, onOpen } = useDisclosure({
    onClose: () => {
      setIsEditing(false);
    },
  });

  function isLowStock(material: Material) {
    return Number(material.stock) < Number(material.minStock);
  }

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
          <MaterialDetails
            {...props}
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
          />
          <MaterialDetailsEditForm
            {...props}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}
