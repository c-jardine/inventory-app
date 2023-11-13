import {
  createMaterialSchema,
  deleteMaterialSchema,
  updateMaterialSchema,
} from '@/features/material';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const materialRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.material.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        stockUnit: true,
        vendor: true,
        categories: {
          orderBy: {
            name: 'asc',
          },
        },
      },
    });
  }),
  create: publicProcedure
    .input(createMaterialSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.material.create({
        data: {
          ...input,
          url: input.url ?? '',
          minStock: input.minStock ?? 0,
          stockUnit: {
            connect: {
              namePlural: input.stockUnit,
            },
          },
          vendor: {
            connect: {
              name: input.vendor,
            },
          },
          categories: {
            connect: input.categories?.map((category) => ({ name: category })),
          },
        },
      });
    }),
  update: publicProcedure
    .input(updateMaterialSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      return ctx.db.material.update({
        where: {
          id: id,
        },
        data: {
          ...rest,
          stockUnit: {
            connect: {
              namePlural: rest.stockUnit,
            },
          },
          vendor: {
            connect: {
              name: rest.vendor,
            },
          },
          categories: {
            connect: rest.categories?.map((category) => ({ name: category })),
          },
        },
      });
    }),
  delete: publicProcedure
    .input(deleteMaterialSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.material.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
