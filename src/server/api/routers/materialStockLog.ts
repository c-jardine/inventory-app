import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';

export const materialStockLogRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.materialStockLog.findMany({
      include: {
        logType: true,
      },
    });
  }),
  getAllByMaterial: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.materialStockLog.findMany({
        where: {
          materialId: input.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          logType: true,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        material: z.number(),
        logType: z.string(),
        prevStock: z.number(),
        stock: z.number(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.$transaction([
        ctx.db.materialStockLog.create({
          data: {
            ...input,
            material: {
              connect: {
                id: input.material,
              },
            },
            logType: {
              connect: {
                name: input.logType,
              },
            },
          },
        }),
        ctx.db.material.update({
          where: {
            id: input.material,
          },
          data: {
            stock: {
              increment: input.stock,
            },
          },
        }),
      ]);
    }),
});
