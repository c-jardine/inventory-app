import { Button, DrawerBody, DrawerFooter } from '@chakra-ui/react';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useUpdateMaterial } from '../hooks';
import { type MaterialFullType } from '../types';
import MaterialForm from './MaterialForm';
/**
 * The edit form for a material used inside the drawer..
 * @param props
 * @returns
 */
export default function MaterialDetailsEditForm(
  props: MaterialFullType & {
    editingState: {
      isEditing: boolean;
      setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    };
  }
) {
  const { editingState, ...material } = props;
  const { form, onSubmit } = useUpdateMaterial(material, () => {
    editingState.setIsEditing(false);
  });

  /**
   * Set the isEdiitng state to false. If the form has been changed, alert the
   * user before canceling.
   */
  function onCancel() {
    if (!form.formState.isDirty) {
      editingState.setIsEditing(false);
    } else if (
      confirm('Are you sure you want to go back? All changes will be lost.')
    ) {
      editingState.setIsEditing(false);
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

  return (
    <>
      <DrawerBody display={editingState.isEditing ? 'block' : 'none'}>
        <FormProvider {...form}>
          <form
            id={`update-${props.name}-form`}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <MaterialForm isEditing />
          </form>
        </FormProvider>
      </DrawerBody>
      <DrawerFooter gap={4}>
        <Button onClick={onCancel}>Cancel</Button>
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
