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
  const defaultValues: UpdateMaterialFormType = {
    ...material,
    url: material.url ?? '',
    stock: material.stock.toString(),
    stockUnit: material.stockUnit.namePlural,
    minStock: material.minStock.toString(),
    costPerUnit: Number(material.costPerUnit),
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
        title: data[0].name,
        description: `Material successfully updated.`,
        status: 'success',
      });
      // Go back to the details pane.
      context.setScreen('DETAILS');

      // Reset the form. Without keepDirtyValues set to true, going back to the
      // form will use the previous initially rendered value. Basically, this
      // just lets the form act the way the user would expect.
      form.reset(defaultValues, { keepDirty: false, keepDirtyValues: true });
    },
    onError: (e) => console.log('AHHH', e),
  });

  /**
   * The onSubmit handler.
   * @param data The new material data.
   */
  function onSubmit(data: UpdateMaterialFormType) {
    query.mutate({ ...data });
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
      form.reset(defaultValues, { keepDirty: false, keepDirtyValues: false });
    }
  }

  return { context, form, onSubmit, onCancel };
}
