import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const materialStockLogTypeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.materialStockLogType.findMany();
  }),
});
