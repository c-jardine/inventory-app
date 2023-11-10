import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import slugify from 'slugify';
import { z } from 'zod';

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }),
  getAllSlugs: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany({
      select: {
        slug: true,
      },
    });
  }),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.category.findFirst({
        where: {
          slug: input.slug,
        },
        include: {
          materials: {
            include: {
              stockUnit: true,
              vendor: true,
              categories: true
            }
          },
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.create({
        data: { ...input, slug: slugify(input.name, { lower: true }) },
      });
    }),
  delete: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.delete({
        where: {
          name: input.name,
        },
      });
    }),
});
