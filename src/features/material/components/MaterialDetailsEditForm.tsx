import { api } from '@/utils/api';
import { Button, DrawerBody, DrawerFooter, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { materialSchema } from '../schema';
import { type MaterialFormType, type MaterialFullType } from '../types';
import MaterialForm from './MaterialForm';

export default function MaterialDetailsEditForm(
  props: MaterialFullType & {
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
  }
) {
  const form = useForm<MaterialFormType>({
    defaultValues: {
      ...props,
      url: props.url ?? '',
      stock: Number(props.stock),
      minStock: Number(props.minStock),
      costPerUnit: Number(props.costPerUnit),
      stockUnit: props.stockUnit.namePlural,
      vendor: props.vendor.name,
      categories: props.categories.map((category) => category.name),
    },
    resolver: zodResolver(materialSchema),
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
      props.setIsEditing(false);
      await utils.material.getAll.invalidate();
    },
  });

  function handleSave(data: MaterialFormType) {
    query.mutate({ id: props.id, ...data });
  }

  function handleCancelEdit() {
    if (!form.formState.isDirty) {
      props.setIsEditing(false);
    } else if (
      confirm('Are you sure you want to go back? All changes will be lost.')
    ) {
      props.setIsEditing(false);
      form.reset(
        {
          name: props.name,
          url: props.url ?? '',
          stock: Number(props.stock),
          minStock: Number(props.minStock),
          costPerUnit: Number(props.costPerUnit),
        },
        { keepValues: false, keepDirty: false }
      );
    }
  }

  if (!props.isEditing) {
    return <></>;
  }

  return (
    <>
      <DrawerBody>
        <FormProvider {...form}>
          <form
            id={`update-${props.name}-form`}
            onSubmit={form.handleSubmit(handleSave)}
          >
            <MaterialForm isEditing />
          </form>
        </FormProvider>
      </DrawerBody>
      <DrawerFooter gap={4}>
        <Button onClick={handleCancelEdit}>Cancel</Button>
        <Button
          form={`update-${props.name}-form`}
          type='submit'
          colorScheme='green'
          isDisabled={!form.formState.isDirty}
        >
          Save
        </Button>
      </DrawerFooter>
    </>
  );
}
