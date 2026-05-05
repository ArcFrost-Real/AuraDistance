export enum UnitSystem {
  METRIC = 'Metric',
  IMPERIAL = 'Imperial',
  NAUTICAL = 'Nautical',
}

export interface Unit {
  id: string;
  label: string;
  symbol: string;
  factor: number; // Factor to convert to meters
  system: UnitSystem;
}

export const DISTANCE_UNITS: Unit[] = [
  // Metric
  { id: 'mm', label: 'Millimeters', symbol: 'mm', factor: 0.001, system: UnitSystem.METRIC },
  { id: 'cm', label: 'Centimeters', symbol: 'cm', factor: 0.01, system: UnitSystem.METRIC },
  { id: 'm', label: 'Meters', symbol: 'm', factor: 1, system: UnitSystem.METRIC },
  { id: 'km', label: 'Kilometers', symbol: 'km', factor: 1000, system: UnitSystem.METRIC },
  // Imperial
  { id: 'in', label: 'Inches', symbol: 'in', factor: 0.0254, system: UnitSystem.IMPERIAL },
  { id: 'ft', label: 'Feet', symbol: 'ft', factor: 0.3048, system: UnitSystem.IMPERIAL },
  { id: 'yd', label: 'Yards', symbol: 'yd', factor: 0.9144, system: UnitSystem.IMPERIAL },
  { id: 'mi', label: 'Miles', symbol: 'mi', factor: 1609.34, system: UnitSystem.IMPERIAL },
  // Nautical
  { id: 'nmi', label: 'Nautical Miles', symbol: 'nmi', factor: 1852, system: UnitSystem.NAUTICAL },
];

export interface CommonConversion {
  title: string;
  value: number;
  fromUnit: string;
  toUnit: string;
  description: string;
}

export const COMMON_CONVERSIONS: CommonConversion[] = [
  {
    title: 'Marathon Distance',
    value: 42.195,
    fromUnit: 'km',
    toUnit: 'mi',
    description: 'The standard length of a marathon race.',
  },
  {
    title: 'Earth Circumference',
    value: 40075,
    fromUnit: 'km',
    toUnit: 'mi',
    description: 'Equatorial circumference of the Earth.',
  },
  {
    title: 'Football Field',
    value: 100,
    fromUnit: 'yd',
    toUnit: 'm',
    description: 'Length of an American football field (excluding end zones).',
  },
  {
    title: 'Tower of Paris (Eiffel)',
    value: 330,
    fromUnit: 'm',
    toUnit: 'ft',
    description: 'Height of the Eiffel Tower including antenna.',
  },
];
