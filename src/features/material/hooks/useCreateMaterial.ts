import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { materialSchema } from '../schema';
import { type MaterialFormType } from '../types';

const defaultValues: MaterialFormType = {
  name: '',
  url: undefined,
  stock: 0,
  stockUnit: '',
  minStock: 0,
  costPerUnit: 0,
  vendor: '',
  categories: [],
};

export default function useCreateMaterial(
  onSuccess?: () => void | Promise<void>,
  onError?: () => void | Promise<void>
) {
  const form = useForm<MaterialFormType>({
    defaultValues,
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
      await utils.material.getAll.invalidate();
      form.reset();
      onSuccess && (await onSuccess());
    },
    onError: onError,
  });

  function onSubmit(data: MaterialFormType) {
    query.mutate(data);
  }

  return { form, onSubmit };
}
