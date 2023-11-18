import { type AppRouter } from '@/server/api/root';
import { api } from '@/utils/api';
import { type inferReactQueryProcedureOptions } from '@trpc/react-query';

export type CreateMaterialOptions =
  inferReactQueryProcedureOptions<AppRouter>['material']['create'];

/**
 * React hook for creating a material.
 * @param queryOptions Options for the TRPC query.
 * @returns The query object.
 */
export default function useCreateMaterial(options?: CreateMaterialOptions) {
  const utils = api.useUtils();
  const query = api.material.create.useMutation({
    ...options,
    onSuccess: async () => {
      await utils.material.getAll.invalidate();
      options?.onSuccess;
    },
  });

  return query;
}
