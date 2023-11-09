import { vendorRouter } from '@/server/api/routers/vendor';
import { createTRPCRouter } from '@/server/api/trpc';
import { categoryRouter } from './routers/category';
import { materialRouter } from './routers/material';
import { stockUnitRouter } from './routers/stockUnit';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  category: categoryRouter,
  material: materialRouter,
  stockUnit: stockUnitRouter,
  vendor: vendorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
