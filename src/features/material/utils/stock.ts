import { type Material } from '@prisma/client';

/**
 * Get the form label for a material log type.
 * @param logType One of either 'Supply Order', 'Audit', 'Product Testing'.
 * @returns The label applicable to the log type.
 */
export function getMaterialLogTypeLabel(
  logType: 'Supply Order' | 'Audit' | 'Product Testing'
) {
  switch (logType) {
    case 'Supply Order':
      return 'Quantity';
    case 'Audit':
      return 'Quantity';
    case 'Product Testing':
      return 'Quantity Used';
    default:
      return 'Quantity';
  }
}

/**
 * Get the updated stock level based on the log type. For a supply order, the
 * new stock level is current stock plus the mutate stock value. For an audit,
 * the new stock level is equal to the mutate stock value. For product testing,
 * the new stock level is current stock minus the mutate stock value.
 * @param logType One of either 'Supply Order', 'Audit', 'Product Testing'.
 * @param currentStock The current stock level.
 * @param mutateStock The stock level to mutate the current stock level with.
 * @returns
 */
export function getUpdatedStockLevel(
  logType: 'Supply Order' | 'Audit' | 'Product Testing',
  currentStock: number,
  mutateStock: number
) {
  switch (logType) {
    case 'Supply Order':
      return (currentStock + mutateStock).toFixed(2);
    case 'Audit':
      return mutateStock.toFixed(2);
    case 'Product Testing':
      return (currentStock - mutateStock).toFixed(2);
    default:
      return mutateStock.toFixed(2);
  }
}

/**
 * Check if the material has low stock. It compares the current stock against
 * the required minimum stock.
 * @param material The Material object.
 * @returns True is the current stock is less than the minimum stock, otherwise
 * false.
 */
export function isLowStock(material: Material) {
  return Number(material.stock) < Number(material.minStock);
}
