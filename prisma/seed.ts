import { db } from "@/server/db";

async function main() {
  await db.stockUnit.createMany({
    data: [
      { nameSingular: "Piece", namePlural: "Pieces", category: "Quantity" },
      { nameSingular: "Ounce", namePlural: "Ounces", category: "Weight" },
      { nameSingular: "Pound", namePlural: "Pounds", category: "Weight" },
      { nameSingular: "Gram", namePlural: "Grams", category: "Weight" },
      { nameSingular: "Kilogram", namePlural: "Kilograms", category: "Weight" },
      { nameSingular: "Inch", namePlural: "Inches", category: "Length" },
      { nameSingular: "Foot", namePlural: "Feet", category: "Length" },
      { nameSingular: "Yard", namePlural: "Yards", category: "Length" },
      {
        nameSingular: "Millimeter",
        namePlural: "Millimeters",
        category: "Length",
      },
      {
        nameSingular: "Centimeter",
        namePlural: "Centimeters",
        category: "Length",
      },
      { nameSingular: "Meter", namePlural: "Meters", category: "Length" },
      {
        nameSingular: "Sq. Inch",
        namePlural: "Square Inches",
        category: "Area",
      },
      { nameSingular: "Sq. Ft.", namePlural: "Square Feet", category: "Area" },
      {
        nameSingular: "Sq. Centimenter",
        namePlural: "Square Centimeters",
        category: "Area",
      },
      {
        nameSingular: "Sq. Meter",
        namePlural: "Square Meters",
        category: "Area",
      },
      {
        nameSingular: "Fluid Ounce",
        namePlural: "Fluid Ounces",
        category: "Volume",
      },
      { nameSingular: "Pint", namePlural: "Pints", category: "Volume" },
      { nameSingular: "Quart", namePlural: "Quarts", category: "Volume" },
      { nameSingular: "Gallon", namePlural: "Gallons", category: "Volume" },
      {
        nameSingular: "Milliliter",
        namePlural: "Milliliters",
        category: "Volume",
      },
      { nameSingular: "Liter", namePlural: "Liters", category: "Volume" },
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
