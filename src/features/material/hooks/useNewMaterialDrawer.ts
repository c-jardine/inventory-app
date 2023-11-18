import { useCreateMaterial } from '@/core/hooks';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createMaterialSchema, type CreateMaterialFormType } from '../schema';

const defaultValues: CreateMaterialFormType = {
  name: '',
  url: undefined,
  stock: 0,
  stockUnit: '',
  minStock: 0,
  costPerUnit: 0,
  vendor: '',
  categories: [],
};

/**
 * React hook containing logic for the NewMaterialDrawer component.
 * @returns The disclosure for the drawer, the form methods, and the onSubmit
 * handler.
 */
export default function useNewMaterialDrawer() {
  const toast = useToast();
  const disclosure = useDisclosure({
    onClose: () => form.reset(),
  });

  // The form methods.
  const form = useForm<CreateMaterialFormType>({
    defaultValues,
    resolver: zodResolver(createMaterialSchema),
  });

  // The query.
  const query = useCreateMaterial({
    onSuccess: (data) => {
      toast({
        title: data.name,
        description: `Material successfully created.`,
        status: 'success',
      });
      form.reset();
      disclosure.onClose();
    },
  });

  /**
   * The onSubmit handler.
   * @param data The material data.
   */
  function onSubmit(data: CreateMaterialFormType) {
    query.mutate(data);
  }

  return { disclosure, form, onSubmit };
}
