import { useUpdateMaterial } from '@/core/hooks';
import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateMaterialSchema, type UpdateMaterialFormType } from '../schema';
import { type MaterialFullType } from '../types';
import useMaterialDrawerContext from './useMaterialDrawerContext';

/**
 * React hook used to update a material.
 * @param onSuccess Optional callback fired when the creation is successful.
 * @param onError Optional callback fired when the creation fails.
 * @returns The form methods and onSubmit handler.
 */
export default function useUpdateMaterialForm(material: MaterialFullType) {
  const defaultValues = {
    ...material,
    url: material.url ?? '',
    stock: Number(material.stock),
    minStock: Number(material.minStock),
    costPerUnit: Number(material.costPerUnit),
    stockUnit: material.stockUnit.namePlural,
    vendor: material.vendor.name,
    categories: material.categories.map((category) => category.name),
  };
  const toast = useToast();
  const context = useMaterialDrawerContext();

  // The form methods.
  const form = useForm<UpdateMaterialFormType>({
    defaultValues,
    resolver: zodResolver(updateMaterialSchema),
  });

  // The query.
  const query = useUpdateMaterial({
    onSuccess: (data) => {
      toast({
        title: data.name,
        description: `Material successfully updated.`,
        status: 'success',
      });
      /**
       * TODO: Not working properly. Ideally, we'll change forms to use the id
       * for relational fields.
       */
      form.reset(undefined, { keepDirty: false });
      context.setScreen('DETAILS');
    },
  });

  /**
   * The onSubmit handler.
   * @param data The new material data.
   */
  function onSubmit(data: UpdateMaterialFormType) {
    query.mutate({ id: material.id, ...data });
  }

  /**
   * Set the isEdiitng state to false. If the form has been changed, alert the
   * user before canceling.
   */
  function onCancel() {
    if (!form.formState.isDirty) {
      context.setScreen('DETAILS');
    } else if (
      confirm('Are you sure you want to go back? All changes will be lost.')
    ) {
      context.setScreen('DETAILS');
      form.reset(
        {
          name: material.name,
          url: material.url ?? '',
          stock: Number(material.stock),
          minStock: Number(material.minStock),
          costPerUnit: Number(material.costPerUnit),
        },
        { keepValues: false, keepDirty: false }
      );
    }
  }

  return { context, form, onSubmit, onCancel };
}
