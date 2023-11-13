import { api } from '@/utils/api';
import { useFormContext } from 'react-hook-form';
import { type CreateMaterialFormType } from '../schema';

/**
 * React hook for managing categories.
 * @returns The form methods, onCreate handler, and list of categories.
 */
export default function useCategories() {
  // The form methods.
  const form = useFormContext<CreateMaterialFormType>();

  // The queries and utils.
  const { data: categories } = api.category.getAll.useQuery();
  const utils = api.useUtils();
  const createQuery = api.category.create.useMutation({
    onSuccess: (data) => {
      const prev = form.getValues('categories');
      if (prev) {
        form.setValue('categories', [...prev, data.name]);
      } else {
        form.setValue('categories', [data.name]);
      }
    },
    onSettled: async () => {
      await utils.category.getAll.invalidate();
    },
  });

  /**
   * The onCreate handler.
   * @param name The name (label) for the category to be created.
   */
  function onCreate(name: string) {
    createQuery.mutate({ name: name });
  }

  return { form, onCreate, categories };
}
