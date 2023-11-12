import { Validation } from '@/core';
import { z } from 'zod';

export const materialSchema = z.object({
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
});
