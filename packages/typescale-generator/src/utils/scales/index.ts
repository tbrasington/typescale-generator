import { buildTypographyScales } from "./buildTypographyScales";

export interface ViewPortProps {
  width: number;
  fontSize: number;
  typeScale: number;
}

export interface GeneratedNamedScalesProps {
  typeScale: GeneratedItemProps[];
}

export interface GeneratedItemProps {
  min: ViewPortProps;
  max: ViewPortProps;
  clamp: string;
}

export interface GenericKeyValueProps {
  [key: string]: string;
}

export const NamedScales = {
  MAJOR_SECOND: "MAJOR_SECOND",
  MINOR_SECOND: "MINOR_SECOND",
  MAJOR_THIRD: "MAJOR_THIRD",
  MINOR_THIRD: "MINOR_THIRD",
  PERFECT_FOURTH: "PERFECT_FOURTH",
  AUGMENTED_FOURTH: "AUGMENTED_FOURTH",
  PERFECT_FIFTH: "PERFECT_FIFTH",
  GOLDEN_RATIO: "GOLDEN_RATIO",
  OCTAVE: "OCTAVE",
  MAJOR_SIXTH: "MAJOR_SIXTH",
  MINOR_SEVENTH: "MINOR_SEVENTH",
  MAJOR_SEVENTH: "MAJOR_SEVENTH",
};

/*
 * Types for scale enums
 */
type NamedScalesProps = typeof NamedScales[keyof typeof NamedScales];

export const TypographyScaleValues = {
  [NamedScales.MINOR_SECOND]: { name: "Minor second", value: 1.067 },
  [NamedScales.MAJOR_SECOND]: { name: "Major second", value: 1.125 },
  [NamedScales.MINOR_THIRD]: { name: "Minor third", value: 1.2 },
  [NamedScales.MAJOR_THIRD]: { name: "Major third", value: 1.25 },
  [NamedScales.PERFECT_FOURTH]: { name: "Perfect fourth", value: 1.333 },
  [NamedScales.AUGMENTED_FOURTH]: {
    name: "Augmented fourth",
    value: 1.414,
  },
  [NamedScales.PERFECT_FIFTH]: { name: "Perfect fifth", value: 1.5 },
  [NamedScales.GOLDEN_RATIO]: { name: "Golden ratio", value: 1.618 },
  [NamedScales.MAJOR_SIXTH]: { name: "Major sixth", value: 1.667 },
  [NamedScales.MINOR_SEVENTH]: { name: "Minor seventh", value: 1.778 },
  [NamedScales.MAJOR_SEVENTH]: { name: "Major seventh", value: 1.875 },
  [NamedScales.OCTAVE]: { name: "Octave", value: 2 },
};

/**
 * Searches through chained references to replace reference with originating value
 * @param scale the scale to use for generation
 * @returns A generated set of scales using the specified scale, along with the min max sizes for a breakpoint
 */
export function generateNamedScales(scale: NamedScalesProps) {
  const config = {
    minViewport: {
      width: 320,
      fontSize: 16,
      typeScale: TypographyScaleValues[scale].value,
    },
    maxViewport: {
      width: 1440,
      fontSize: 20,
      typeScale: TypographyScaleValues[scale].value,
    },
  };

  const typographyScales = buildTypographyScales({
    ...config,
    range: [-2, -1, 0, 1, 2, 3, 4, 5],
  });

  return typographyScales;
}