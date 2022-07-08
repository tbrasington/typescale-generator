interface ViewPortProps {
  width: number;
  fontSize: number;
  typeScale: number;
}

interface GeneratedNamedScalesProps {
  typeScale: GeneratedItemProps[];
}

interface GeneratedItemProps {
  min: number;
  max: number;
  clamp: string;
}

interface GenericKeyValueProps {
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

function round(num: number) {
  return Math.round(num * 100) / 100;
}

function clampBuilder(
  minWidthPx: number,
  maxWidthPx: number,
  minSizePx: number,
  maxSizePx: number
) {
  const pixelsPerRem = 16;

  const minWidth = minWidthPx / pixelsPerRem;
  const maxWidth = maxWidthPx / pixelsPerRem;

  const minSize = minSizePx / pixelsPerRem;
  const maxSize = maxSizePx / pixelsPerRem;

  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minSize;

  const min = `${round(minSize)}rem`;
  const val = `${round(yAxisIntersection)}rem + ${round(slope * 100)}vw`;
  const max = `${round(maxSize)}rem`;

  return `clamp(${min}, ${val}, ${max})`;
}

export function buildFluidDesignSystem(opts: {
  range: number[];
  minViewport: ViewPortProps;
  maxViewport: ViewPortProps;
}) {
  const { minViewport, maxViewport, range } = opts;

  const system: GeneratedNamedScalesProps = {
    typeScale: [],
  };

  const minFluidTypeStep = range[0];
  const maxFluidTypeStep = range[range.length - 1];
  for (let i = minFluidTypeStep; i <= maxFluidTypeStep; i++) {
    const valueMin = round(
      minViewport.fontSize * Math.pow(minViewport.typeScale, i)
    );

    const valueMax = round(
      maxViewport.fontSize * Math.pow(maxViewport.typeScale, i)
    );

    system.typeScale[i] = {
      min: valueMin,
      max: valueMax,
      clamp: clampBuilder(
        minViewport.width,
        maxViewport.width,
        valueMin,
        valueMax
      ),
    };
  }

  return {
    ...system,
  };
}

export function generateCSS({ scales }: { scales: GeneratedItemProps[] }) {
  const typeSteps: GenericKeyValueProps = {};

  for (const step of Object.keys(scales)) {
    typeSteps[`--step-${step}`] = `${scales[parseInt(step)].clamp};`;
  }

 return `:root ${JSON.stringify(typeSteps, null, "  ").replace(/"/g,"").replace(/,/g,"")}`
}

/**
 * @returns An object of CSS clamped values, corresponding to their step.
 * @example ```js
 * {
      'step-0': 'clamp(1rem, 0.93rem + 0.36vw, 1.25rem)',
      'step-1': 'clamp(1.62rem, 1.5rem + 0.58vw, 2.02rem)',
      'step-2': 'clamp(2.62rem, 2.43rem + 0.93vw, 3.27rem)',
      'step-3': 'clamp(4.24rem, 3.93rem + 1.51vw, 5.3rem)',
      'step-4': 'clamp(6.85rem, 6.36rem + 2.45vw, 8.57rem)',
      'step-5': 'clamp(11.09rem, 10.3rem + 3.96vw, 13.86rem)',
      'step--2': 'clamp(0.38rem, 0.35rem + 0.14vw, 0.48rem)',
      'step--1': 'clamp(0.62rem, 0.57rem + 0.22vw, 0.77rem)'
    }
 * ```
 */
export function generateObject({ scales }: { scales: GeneratedItemProps[] }) {
  const typeSteps: GenericKeyValueProps = {};

  for (const step of Object.keys(scales)) {
    typeSteps[`step-${step}`] = scales[parseInt(step)].clamp;
  }

  return typeSteps;
}

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

  const fluidDesignSystem = buildFluidDesignSystem({
    ...config,
    range: [-2, -1, 0, 1, 2, 3, 4, 5],
  });

  return fluidDesignSystem;
}
