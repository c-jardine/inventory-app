import { type SelectOption } from '@/core';
import { type AppRouter } from '@/server/api/root';
import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type inferRouterOutputs } from '@trpc/server';
import React from 'react';
import { useForm } from 'react-hook-form';
import { updateStockSchema, type UpdateStockFormType } from '../schema';

/**
 * React hook used to update a material's stock.
 * @param onSuccess Optional callback fired when the creation is successful.
 * @param onError Optional callback fired when the creation fails.
 * @returns The form methods, onSubmit handler, and list of log types..
 */
export default function useUpdateStock(
  material: inferRouterOutputs<AppRouter>['material']['getAll'][0],
  onSuccess?: () => void | Promise<void>,
  onError?: () => void | Promise<void>
) {
  const toast = useToast();

  // The form methods.
  const form = useForm<UpdateStockFormType>({
    defaultValues: {
      stock: '0',
    },
    resolver: zodResolver(updateStockSchema),
  });
  const { resetField } = form;

  // The log types query.
  const { data: logTypes } = api.materialStockLogType.getAll.useQuery();

  // Handle resetting the select input data once the log types load.
  const [types, setTypes] = React.useState<SelectOption[]>([]);
  React.useEffect(() => {
    if (logTypes) {
      setTypes(
        logTypes?.map((type) => ({
          label: type.name,
          value: type.name,
        }))
      );
      logTypes[0] &&
        resetField('logType', {
          defaultValue: logTypes[0].name as UpdateStockFormType['logType'],
          keepDirty: false,
        });
    }
  }, [resetField, logTypes]);

  // The create log query and utils. A new log is created when the stock is
  // updated.
  const utils = api.useUtils();
  const query = api.materialStockLog.create.useMutation({
    onSuccess: async () => {
      toast({
        title: material.name,
        description: 'Stock successfully updated.',
        status: 'success',
      });
      await utils.material.getAll.invalidate();
      await utils.materialStockLog.getAllByMaterial.invalidate();
      await utils.category.getBySlug.invalidate();
      onSuccess && (await onSuccess());
    },
    onError,
  });

  /**
   * The onSubmit handler.
   * @param data The stock form data.
   */
  function onSubmit(data: UpdateStockFormType) {
    query.mutate({
      ...data,
      material: material.id,
      prevStock: parseFloat(material.stock.toString()),
      stock: (() => {
        if (form.watch('logType') === 'Supply Order') {
          return Number(material.stock) + Number(form.watch('stock'));
        } else if (form.watch('logType') === 'Product Testing') {
          return Number(material.stock) - Number(form.watch('stock'));
        } else {
          return Number(form.watch('stock'));
        }
      })(),
    });
  }

  return { form, onSubmit, types };
}
