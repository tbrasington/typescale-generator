import { GeneratedItemProps, GenericKeyValueProps } from "./";

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

export function generateObject({ scales }: { scales: GeneratedItemProps[]; }) {
  const typeSteps: GenericKeyValueProps = {};

  for (const step of Object.keys(scales)) {
    typeSteps[`step-${step}`] = scales[parseInt(step)].clamp;
  }

  return typeSteps;
}
