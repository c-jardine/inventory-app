import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const stockUnitRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.stockUnit.findMany();
  }),
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.stockUnit.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
});
