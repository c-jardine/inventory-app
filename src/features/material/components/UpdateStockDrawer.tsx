import { type AppRouter } from '@/server/api/root';
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { type inferRouterOutputs } from '@trpc/server';
import React from 'react';
import { isLowStock } from '../utils';
import UpdateStockForm from './UpdateStockForm';

export default function UpdateStockDrawer(
  props: inferRouterOutputs<AppRouter>['material']['getAll'][0]
) {
  const btnRef = React.useRef(null);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        variant='link'
        px={0}
        fontSize='xs'
        fontWeight={isLowStock(props) ? 'semibold' : 'normal'}
        color={isLowStock(props) ? 'red.500' : 'black'}
        cursor='pointer'
        _hover={{
          textDecoration: 'underline',
          textUnderlineOffset: 4,
        }}
      >
        {Number(props.stock)}{' '}
        {Number(props.stock) === 1
          ? props.stockUnit.abbreviationSingular
          : props.stockUnit.abbreviationPlural}
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Text fontWeight='semibold' fontSize='lg'>
              Update Stock Level
            </Text>
            <Text fontSize='xs' color='gray.500' mt={2}>
              {props.name}
            </Text>
          </DrawerHeader>
          <UpdateStockForm {...props} onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
}
