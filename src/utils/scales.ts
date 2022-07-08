

interface viewPortProps {
  width: number;
  fontSize: number;
  typeScale: number;
}

interface SystemProps {
  typeScale: systemItemProps[];
}

interface systemItemProps {
  min: number;
  max: number;
  clamp: string;
}

export const SCALES = {
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

export const TypographyScaleValues = {
  [SCALES.MINOR_SECOND]: { name: "Minor second", value: 1.067 },
  [SCALES.MAJOR_SECOND]: { name: "Major second", value: 1.125 },
  [SCALES.MINOR_THIRD]: { name: "Minor third", value: 1.2 },
  [SCALES.MAJOR_THIRD]: { name: "Major third", value: 1.25 },
  [SCALES.PERFECT_FOURTH]: { name: "Perfect fourth", value: 1.333 },
  [SCALES.AUGMENTED_FOURTH]: {
    name: "Augmented fourth",
    value: 1.414,
  },
  [SCALES.PERFECT_FIFTH]: { name: "Perfect fifth", value: 1.5 },
  [SCALES.GOLDEN_RATIO]: { name: "Golden ratio", value: 1.618 },
  [SCALES.MAJOR_SIXTH]: { name: "Major sixth", value: 1.667 },
  [SCALES.MINOR_SEVENTH]: { name: "Minor seventh", value: 1.778 },
  [SCALES.MAJOR_SEVENTH]: { name: "Major seventh", value: 1.875 },
  [SCALES.OCTAVE]: { name: "Octave", value: 2 },
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

export function generateCSS(system: { typeScale: any }) {
  let css = "";

  const { typeScale } = system;

  for (const step of Object.keys(typeScale)) {
    css += `--step-${step}: ${typeScale[step].clamp};`;
  }
  return css;
}


interface cssProps { 
  [key: string]: string 
}

export function generateTypeScript({ scales}  : {scales: systemItemProps[]}) {


const typeSteps : cssProps = {} 

  for (const step of Object.keys(scales)) {
    typeSteps[`step-${step}`] = scales[parseInt(step)].clamp
  }

  return typeSteps
}
export function buildFluidDesignSystem(opts: {
  typeScaleSteps: number[];
  minViewport: viewPortProps;
  maxViewport: viewPortProps;
}) {
  const { minViewport, maxViewport, typeScaleSteps } = opts;

  const system: SystemProps = {
    typeScale: [],
  };

  const minFluidTypeStep = typeScaleSteps[0];
  const maxFluidTypeStep = typeScaleSteps[typeScaleSteps.length - 1];

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

export function generateScales() {
  const config = {
    minViewport: {
      width: 320,
      fontSize: 16,
      typeScale: TypographyScaleValues[SCALES.MINOR_SECOND].value,
    },
    maxViewport: {
      width: 1440,
      fontSize: 20,
      typeScale: TypographyScaleValues[SCALES.MINOR_SECOND].value,
    },
  };

  const fluidDesignSystem = buildFluidDesignSystem({
    ...config,
    typeScaleSteps: [-2, -1, 0, 1, 2, 3, 4, 5],
  });

  return fluidDesignSystem;
}
