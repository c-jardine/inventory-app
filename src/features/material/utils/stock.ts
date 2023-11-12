export function getStockLabel(
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

export function getStockLevel(
  logType: 'Supply Order' | 'Audit' | 'Product Testing',
  setStock: number,
  newStock: number
) {
  switch (logType) {
    case 'Supply Order':
      return (setStock + newStock).toFixed(2);
    case 'Audit':
      return newStock.toFixed(2);
    case 'Product Testing':
      return (setStock - newStock).toFixed(2);
    default:
      return newStock.toFixed(2);
  }
}
