import { api } from '@/utils/api';

/**
 * React hook for getting all materials.
 * @returns The query object.
 */
export default function useGetAllMaterials() {
  const query = api.material.getAll.useQuery();

  return { ...query };
}
