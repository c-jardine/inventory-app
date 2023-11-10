import { type AppRouter } from '@/server/api/root';
import { api } from '@/utils/api';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Material } from '@prisma/client';
import { type inferRouterOutputs } from '@trpc/server';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import UpdateStockForm from './UpdateStockForm';

const schema = z.object({
  material: z.number(),
  logType: z.string(),
  stock: z.number(),
  notes: z.string().optional(),
});

export type UpdateStockFormType = z.infer<typeof schema>;

export default function UpdateStockPopover(
  props: inferRouterOutputs<AppRouter>['material']['getAll'][0]
) {
  const btnRef = React.useRef(null);

  const form = useForm<UpdateStockFormType>({
    defaultValues: {
      material: props.id,
    },
    resolver: zodResolver(schema),
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

  function isLowStock(material: Material) {
    return Number(material.stock) < Number(material.minStock);
  }

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.materialStockLog.create.useMutation({
    onSuccess: async () => {
      toast({
        title: props.name,
        description: 'Stock successfully updated.',
        status: 'success',
      });
      await utils.material.getAll.invalidate();
      onClose();
    },
  });

  function onSubmit(data: UpdateStockFormType) {
    query.mutate(data);
  }

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
          ? props.stockUnit.nameSingular
          : props.stockUnit.namePlural}
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DrawerHeader>
                <Text fontWeight='semibold' fontSize='lg'>
                  Update Stock Level
                </Text>
                <Text fontSize='xs' color='gray.500' mt={2}>
                  {props.name}
                </Text>
              </DrawerHeader>
              <DrawerBody>
                <UpdateStockForm {...props} />
              </DrawerBody>
              <DrawerFooter
                display='flex'
                gap={2}
                justifyContent='flex-end'
                borderTopWidth={0}
              >
                <Button variant='outline' onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  colorScheme={form.formState.isValid ? 'green' : 'gray'}
                  isDisabled={!form.formState.isValid}
                >
                  Save
                </Button>
              </DrawerFooter>
            </form>
          </FormProvider>
        </DrawerContent>
      </Drawer>
    </>
  );
}
