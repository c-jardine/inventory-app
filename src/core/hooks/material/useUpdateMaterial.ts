import { type AppRouter } from '@/server/api/root';
import { api } from '@/utils/api';
import { type inferReactQueryProcedureOptions } from '@trpc/react-query';

export type UpdateMaterialOptions =
  inferReactQueryProcedureOptions<AppRouter>['material']['update'];

/**
 * React hook for updating a material.
 * @param queryOptions Options for the TRPC query.
 * @returns The query object.
 */
export default function useUpdateMaterial(queryOptions: UpdateMaterialOptions) {
  const utils = api.useUtils();
  const query = api.material.update.useMutation({
    ...queryOptions,
    onSuccess: async () => {
      await utils.material.getAll.invalidate();
      queryOptions.onSuccess;
    },
  });

  return { ...query };
}
