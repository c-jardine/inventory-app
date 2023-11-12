import { z } from 'zod';

import { Validation } from '@/core';
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
          }
        },
      },
    });
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, Validation.MIN_CHARS(1)),
        url: z.union([
          z.string().url(Validation.VALID_URL).optional(),
          z.literal(''),
        ]),
        stock: z
          .number({ invalid_type_error: Validation.REQUIRED })
          .min(0, Validation.NOT_NEGATIVE),
        stockUnit: z.string(),
        minStock: z
          .union([
            z
              .number({ invalid_type_error: Validation.REQUIRED })
              .min(0, Validation.NOT_NEGATIVE),
            z.nan(),
          ])
          .optional(),
        costPerUnit: z
          .number({ invalid_type_error: Validation.REQUIRED })
          .min(0, Validation.NOT_NEGATIVE),
        vendor: z.string(),
        categories: z.string().array().optional(),
      })
    )
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
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1, Validation.MIN_CHARS(1)),
        url: z.union([
          z.string().url(Validation.VALID_URL).optional(),
          z.literal(''),
        ]),
        stock: z
          .number({ invalid_type_error: Validation.REQUIRED })
          .min(0, Validation.NOT_NEGATIVE),
        stockUnit: z.string(),
        minStock: z
          .union([
            z
              .number({ invalid_type_error: Validation.REQUIRED })
              .min(0, Validation.NOT_NEGATIVE),
            z.nan(),
          ])
          .optional(),
        costPerUnit: z
          .number({ invalid_type_error: Validation.REQUIRED })
          .min(0, Validation.NOT_NEGATIVE),
        vendor: z.string(),
        categories: z.string().array().optional(),
      })
    )
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
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.material.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
