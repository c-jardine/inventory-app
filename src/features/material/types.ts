import { type AppRouter } from '@/server/api/root';
import {
  type Category,
  type Material,
  type StockUnit,
  type Vendor,
} from '@prisma/client';
import { type inferRouterOutputs } from '@trpc/server';

export type MaterialFullType = Material & {
  stockUnit: StockUnit;
  vendor: Vendor;
  categories: Category[];
};

export type GetAllMaterialsResult =
  inferRouterOutputs<AppRouter>['material']['getAll'];
