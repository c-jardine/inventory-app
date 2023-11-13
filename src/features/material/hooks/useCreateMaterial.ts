import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';
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
 * React hook used to create a new material.
 * @param onSuccess Optional callback fired when the creation is successful.
 * @param onError Optional callback fired when the creation fails.
 * @returns The form methods and onSubmit handler.
 */
export default function useCreateMaterial(
  onSuccess?: () => void | Promise<void>,
  onError?: () => void | Promise<void>
) {
  const toast = useToast();

  // The form methods.
  const form = useForm<CreateMaterialFormType>({
    defaultValues,
    resolver: zodResolver(createMaterialSchema),
  });

  // The query and utils.
  const utils = api.useUtils();
  const query = api.material.create.useMutation({
    onSuccess: async (data) => {
      toast({
        title: data.name,
        description: `Material successfully created.`,
        status: 'success',
      });
      await utils.material.getAll.invalidate();
      form.reset();
      onSuccess && (await onSuccess());
    },
    onError: onError,
  });

  /**
   * The onSubmit handler.
   * @param data The material data.
   */
  function onSubmit(data: CreateMaterialFormType) {
    query.mutate(data);
  }

  return { form, onSubmit };
}
