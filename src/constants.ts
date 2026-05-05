export enum UnitCategory {
  DISTANCE = 'Distance',
  WEIGHT = 'Weight',
  TEMPERATURE = 'Temperature',
  AREA = 'Area',
  VOLUME = 'Volume',
}

export interface Unit {
  id: string;
  label: string;
  symbol: string;
  factor: number; // Factor to convert to base unit
  category: UnitCategory;
  offset?: number; // Used for temperature (e.g., Celsius to Kelvin)
}

// Base units: 
// Distance: Meters (m)
// Weight: Kilograms (kg)
// Temperature: Kelvin (K)
// Area: Square Meters (m²)
// Volume: Liters (L)

export const ALL_UNITS: Unit[] = [
  // Distance (Base: Meters)
  { id: 'mm', label: 'Millimeters', symbol: 'mm', factor: 0.001, category: UnitCategory.DISTANCE },
  { id: 'cm', label: 'Centimeters', symbol: 'cm', factor: 0.01, category: UnitCategory.DISTANCE },
  { id: 'm', label: 'Meters', symbol: 'm', factor: 1, category: UnitCategory.DISTANCE },
  { id: 'km', label: 'Kilometers', symbol: 'km', factor: 1000, category: UnitCategory.DISTANCE },
  { id: 'in', label: 'Inches', symbol: 'in', factor: 0.0254, category: UnitCategory.DISTANCE },
  { id: 'ft', label: 'Feet', symbol: 'ft', factor: 0.3048, category: UnitCategory.DISTANCE },
  { id: 'mi', label: 'Miles', symbol: 'mi', factor: 1609.34, category: UnitCategory.DISTANCE },

  // Weight (Base: Kilograms)
  { id: 'mg', label: 'Milligrams', symbol: 'mg', factor: 0.000001, category: UnitCategory.WEIGHT },
  { id: 'g', label: 'Grams', symbol: 'g', factor: 0.001, category: UnitCategory.WEIGHT },
  { id: 'kg', label: 'Kilograms', symbol: 'kg', factor: 1, category: UnitCategory.WEIGHT },
  { id: 'oz', label: 'Ounces', symbol: 'oz', factor: 0.0283495, category: UnitCategory.WEIGHT },
  { id: 'lb', label: 'Pounds', symbol: 'lb', factor: 0.453592, category: UnitCategory.WEIGHT },
  { id: 't', label: 'Metric Tons', symbol: 't', factor: 1000, category: UnitCategory.WEIGHT },

  // Temperature (Base: Kelvin)
  { id: 'c', label: 'Celsius', symbol: '°C', factor: 1, offset: 273.15, category: UnitCategory.TEMPERATURE },
  { id: 'f', label: 'Fahrenheit', symbol: '°F', factor: 5/9, offset: 273.15 - (32 * 5/9), category: UnitCategory.TEMPERATURE },
  { id: 'k', label: 'Kelvin', symbol: 'K', factor: 1, offset: 0, category: UnitCategory.TEMPERATURE },

  // Area (Base: Square Meters)
  { id: 'sq-cm', label: 'Square Centimeters', symbol: 'cm²', factor: 0.0001, category: UnitCategory.AREA },
  { id: 'sq-m', label: 'Square Meters', symbol: 'm²', factor: 1, category: UnitCategory.AREA },
  { id: 'sq-km', label: 'Square Kilometers', symbol: 'km²', factor: 1000000, category: UnitCategory.AREA },
  { id: 'sq-ft', label: 'Square Feet', symbol: 'ft²', factor: 0.092903, category: UnitCategory.AREA },
  { id: 'acre', label: 'Acres', symbol: 'ac', factor: 4046.86, category: UnitCategory.AREA },

  // Volume (Base: Liters)
  { id: 'ml', label: 'Milliliters', symbol: 'ml', factor: 0.001, category: UnitCategory.VOLUME },
  { id: 'l', label: 'Liters', symbol: 'l', factor: 1, category: UnitCategory.VOLUME },
  { id: 'gal', label: 'Gallons (US)', symbol: 'gal', factor: 3.78541, category: UnitCategory.VOLUME },
  { id: 'cup', label: 'Cups (US)', symbol: 'cup', factor: 0.236588, category: UnitCategory.VOLUME },
];

export interface CommonConversion {
  title: string;
  value: number;
  fromUnit: string;
  toUnit: string;
  description: string;
  category: UnitCategory;
}

export const COMMON_CONVERSIONS: CommonConversion[] = [
  {
    title: 'Marathon',
    value: 42.195,
    fromUnit: 'km',
    toUnit: 'mi',
    category: UnitCategory.DISTANCE,
    description: 'Standard long-distance race.',
  },
  {
    title: 'Room Temp',
    value: 20,
    fromUnit: 'c',
    toUnit: 'f',
    category: UnitCategory.TEMPERATURE,
    description: 'Comfortable indoor temperature.',
  },
  {
    title: 'Standard Weight',
    value: 1,
    fromUnit: 'kg',
    toUnit: 'lb',
    category: UnitCategory.WEIGHT,
    description: 'Basic metric to imperial mass conversion.',
  },
  {
    title: 'Typical Acre',
    value: 1,
    fromUnit: 'acre',
    toUnit: 'sq-m',
    category: UnitCategory.AREA,
    description: 'Common plot size measurement.',
  },
];
