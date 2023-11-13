import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateMaterialSchema, type UpdateMaterialFormType } from '../schema';
import { type MaterialFullType } from '../types';

/**
 * React hook used to update a material.
 * @param onSuccess Optional callback fired when the creation is successful.
 * @param onError Optional callback fired when the creation fails.
 * @returns The form methods and onSubmit handler.
 */
export default function useUpdateMaterial(
  material: MaterialFullType,
  onSuccess?: () => void | Promise<void>,
  onError?: () => void | Promise<void>
) {
  const form = useForm<UpdateMaterialFormType>({
    defaultValues: {
      ...material,
      url: material.url ?? '',
      stock: Number(material.stock),
      minStock: Number(material.minStock),
      costPerUnit: Number(material.costPerUnit),
      stockUnit: material.stockUnit.namePlural,
      vendor: material.vendor.name,
      categories: material.categories.map((category) => category.name),
    },
    resolver: zodResolver(updateMaterialSchema),
  });

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.material.update.useMutation({
    onSuccess: async (data) => {
      toast({
        title: data.name,
        description: `Material successfully updated.`,
        status: 'success',
      });
      await utils.material.getAll.invalidate();
      onSuccess && (await onSuccess());
    },
    onError,
  });

  function onSubmit(data: UpdateMaterialFormType) {
    query.mutate({ id: material.id, ...data });
  }

  return { form, onSubmit };
}
