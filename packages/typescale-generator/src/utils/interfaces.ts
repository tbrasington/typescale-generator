
export interface ViewPortProps {
  width: number;
  fontSize: number;
  typeScale: number;
  $name?: string;
}

export type TypeScaleProps = {[key: string]: GeneratedItemProps}
export interface GeneratedNamedScalesProps {
  typeScale: TypeScaleProps
}


export interface GeneratedItemProps {
  step : number
  sizes : ViewPortProps[];
  clamp: string;
}

export interface RangeProps {
  min: number;
  max: number;
}
export type GenericKeyValueProps =  {
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
} ;


/*
 * Types for scale enums
 */
export type NamedScalesProps = keyof typeof NamedScales;


export type ScaleValeProps = {
  [key in NamedScalesProps]: {
    name: string;
    value: number;
  };
};

export const TypographyScaleValues : ScaleValeProps= {
  MINOR_SECOND: { name: "Minor second", value: 1.067 },
  MAJOR_SECOND: { name: "Major second", value: 1.125 },
  MINOR_THIRD: { name: "Minor third", value: 1.2 },
  MAJOR_THIRD: { name: "Major third", value: 1.25 },
 PERFECT_FOURTH: { name: "Perfect fourth", value: 1.333 },
  AUGMENTED_FOURTH: {
    name: "Augmented fourth",
    value: 1.414,
  },
  PERFECT_FIFTH: { name: "Perfect fifth", value: 1.5 },
  GOLDEN_RATIO: { name: "Golden ratio", value: 1.618 },
  MAJOR_SIXTH: { name: "Major sixth", value: 1.667 },
  MINOR_SEVENTH: { name: "Minor seventh", value: 1.778 },
  MAJOR_SEVENTH: { name: "Major seventh", value: 1.875 },
  OCTAVE: { name: "Octave", value: 2 },
}

