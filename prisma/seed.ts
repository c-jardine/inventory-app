import { db } from '@/server/db';

async function main() {
  await db.stockUnit.createMany({
    data: [
      {
        nameSingular: 'Piece',
        namePlural: 'Pieces',
        abbreviationSingular: 'pc',
        abbreviationPlural: 'pcs',
        category: 'Quantity',
      },
      {
        nameSingular: 'Ounce',
        namePlural: 'Ounces',
        abbreviationSingular: 'oz',
        abbreviationPlural: 'oz',
        category: 'Weight',
      },
      {
        nameSingular: 'Pound',
        namePlural: 'Pounds',
        abbreviationSingular: 'lb',
        abbreviationPlural: 'lbs',
        category: 'Weight',
      },
      {
        nameSingular: 'Gram',
        namePlural: 'Grams',
        abbreviationSingular: 'g',
        abbreviationPlural: 'g',
        category: 'Weight',
      },
      {
        nameSingular: 'Kilogram',
        namePlural: 'Kilograms',
        abbreviationSingular: 'kg',
        abbreviationPlural: 'kg',
        category: 'Weight',
      },
      {
        nameSingular: 'Inch',
        namePlural: 'Inches',
        abbreviationSingular: 'in',
        abbreviationPlural: 'in',
        category: 'Length',
      },
      {
        nameSingular: 'Foot',
        namePlural: 'Feet',
        abbreviationSingular: 'ft',
        abbreviationPlural: 'ft',
        category: 'Length',
      },
      {
        nameSingular: 'Yard',
        namePlural: 'Yards',
        abbreviationSingular: 'yd',
        abbreviationPlural: 'yd',
        category: 'Length',
      },
      {
        nameSingular: 'Millimeter',
        namePlural: 'Millimeters',
        abbreviationSingular: 'mm',
        abbreviationPlural: 'mm',
        category: 'Length',
      },
      {
        nameSingular: 'Centimeter',
        namePlural: 'Centimeters',
        abbreviationSingular: 'cm',
        abbreviationPlural: 'cm',
        category: 'Length',
      },
      {
        nameSingular: 'Meter',
        namePlural: 'Meters',
        abbreviationSingular: 'm',
        abbreviationPlural: 'm',
        category: 'Length',
      },
      {
        nameSingular: 'Sq. Inch',
        namePlural: 'Square Inches',
        abbreviationSingular: 'sq in',
        abbreviationPlural: 'sq in',
        category: 'Area',
      },
      {
        nameSingular: 'Sq. Ft.',
        namePlural: 'Square Feet',
        abbreviationSingular: 'sq ft',
        abbreviationPlural: 'sq ft',
        category: 'Area',
      },
      {
        nameSingular: 'Sq. Centimenter',
        namePlural: 'Square Centimeters',
        abbreviationSingular: 'sq cm',
        abbreviationPlural: 'sq cm',
        category: 'Area',
      },
      {
        nameSingular: 'Sq. Meter',
        namePlural: 'Square Meters',
        abbreviationSingular: 'sq m',
        abbreviationPlural: 'sq m',
        category: 'Area',
      },
      {
        nameSingular: 'Fluid Ounce',
        namePlural: 'Fluid Ounces',
        abbreviationSingular: 'fl oz',
        abbreviationPlural: 'fl oz',
        category: 'Volume',
      },
      {
        nameSingular: 'Pint',
        namePlural: 'Pints',
        abbreviationSingular: 'pt',
        abbreviationPlural: 'pts',
        category: 'Volume',
      },
      {
        nameSingular: 'Quart',
        namePlural: 'Quarts',
        abbreviationSingular: 'qt',
        abbreviationPlural: 'qts',
        category: 'Volume',
      },
      {
        nameSingular: 'Gallon',
        namePlural: 'Gallons',
        abbreviationSingular: 'gal',
        abbreviationPlural: 'gals',
        category: 'Volume',
      },
      {
        nameSingular: 'Milliliter',
        namePlural: 'Milliliters',
        abbreviationSingular: 'mL',
        abbreviationPlural: 'mL',
        category: 'Volume',
      },
      {
        nameSingular: 'Liter',
        namePlural: 'Liters',
        abbreviationSingular: 'L',
        abbreviationPlural: 'L',
        category: 'Volume',
      },
    ],
  });

  await db.materialStockLogType.createMany({
    data: [
      { name: 'Supply Order' },
      { name: 'Audit' },
      { name: 'Product Testing' },
    ],
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
