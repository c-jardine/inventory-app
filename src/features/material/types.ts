import {
  type Category,
  type Material,
  type StockUnit,
  type Vendor,
} from '@prisma/client';
import { type z } from 'zod';
import { type materialSchema } from './schema';

export type MaterialFormType = z.infer<typeof materialSchema>;

export type MaterialFullType = Material & {
  stockUnit: StockUnit;
  vendor: Vendor;
  categories: Category[];
};
