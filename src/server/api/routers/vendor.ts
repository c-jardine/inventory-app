import { z } from 'zod';

import { Validation } from '@/core';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const vendorRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.vendor.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        url: z.union([
          z.string().url(Validation.VALID_URL).optional(),
          z.literal(''),
        ]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.vendor.create({ data: input });
    }),
  delete: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.vendor.delete({
        where: {
          name: input.name,
        },
      });
    }),
});
