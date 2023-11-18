import { Button, DrawerBody, DrawerFooter } from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { useUpdateMaterialForm } from '../hooks';
import { type MaterialFullType } from '../types';
import MutateMaterialForm from './MutateMaterialForm';

/**
 * The edit form for a material used inside the drawer.
 * @param props The material data.
 */
export default function UpdateMaterialForm(props: MaterialFullType) {
  const {
    context: { screen },
    form,
    onSubmit,
    onCancel,
  } = useUpdateMaterialForm(props);

  return (
    <>
      <DrawerBody display={screen === 'EDIT' ? 'block' : 'none'}>
        <FormProvider {...form}>
          <form
            id={`update-${props.name}-form`}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <MutateMaterialForm />
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
