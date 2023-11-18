import { Validation } from '@/core';
import { z } from 'zod';

/**
 * Sechema for creating a new material.
 */
export const createMaterialSchema = z.object({
  name: z.string().min(1, Validation.MIN_CHARS(1)),
  url: z.union([
    z.string().url(Validation.VALID_URL).optional(),
    z.literal(''),
  ]),
  stock: z.string({ invalid_type_error: Validation.REQUIRED }),
  stockUnit: z.string(),
  minStock: z.string().optional(),
  costPerUnit: z
    .number({ invalid_type_error: Validation.REQUIRED })
    .min(0, Validation.NOT_NEGATIVE),
  vendor: z.string(),
  categories: z.string().array().optional(),
});

/**
 * Type of createMaterialSchema.
 */
export type CreateMaterialFormType = z.infer<typeof createMaterialSchema>;

/**
 * Update material schema.
 */
export const updateMaterialSchema = createMaterialSchema.merge(
  z.object({
    id: z.number(),
  })
);

/**
 * Type of createMaterialSchema.
 */
export type UpdateMaterialFormType = z.infer<typeof createMaterialSchema>;

/**
 * Update material stock schema.
 */
export const updateStockSchema = z.object({
  logType: z.union([
    z.literal('Supply Order'),
    z.literal('Audit'),
    z.literal('Product Testing'),
  ]),
  stock: z.string(),
  notes: z.string().optional(),
});

/**
 * Type of updateStockSchema.
 */
export type UpdateStockFormType = z.infer<typeof updateStockSchema>;

export const deleteMaterialSchema = z.object({
  id: z.number(),
});
