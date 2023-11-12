import { type AppRouter } from '@/server/api/root';
import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type inferRouterOutputs } from '@trpc/server';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  logType: z.union([
    z.literal('Supply Order'),
    z.literal('Audit'),
    z.literal('Product Testing'),
  ]),
  stock: z.number(),
  notes: z.string().optional(),
});

export type StockLogTypeOption = {
  readonly label: z.infer<typeof schema>['logType'];
  readonly value: z.infer<typeof schema>['logType'];
};

export type UpdateStockFormType = z.infer<typeof schema>;

export default function useUpdateStock(
  material: inferRouterOutputs<AppRouter>['material']['getAll'][0],
  onSuccess?: () => void | Promise<void>,
  onError?: () => void | Promise<void>
) {
  const form = useForm<UpdateStockFormType>({ resolver: zodResolver(schema) });
  const { resetField } = form;

  const { data: logTypes } = api.materialStockLogType.getAll.useQuery();

  const [types, setTypes] = React.useState<StockLogTypeOption[]>([]);
  React.useEffect(() => {
    if (logTypes) {
      setTypes(
        logTypes?.map((type) => ({
          label: type.name as z.infer<typeof schema>['logType'],
          value: type.name as z.infer<typeof schema>['logType'],
        }))
      );
      logTypes[0] &&
        resetField('logType', {
          defaultValue: logTypes[0].name as z.infer<typeof schema>['logType'],
          keepDirty: false,
        });
    }
  }, [resetField, logTypes]);

  const toast = useToast();

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
