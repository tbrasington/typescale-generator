import { ViewPortProps } from "../interfaces";
import { round } from "../round";
import { clampBuilder } from "./clampBuilder";
import { numberToRem } from "./numberToRem";


/**
 * @returns An object of CSS clamped values and their min and max number values, corresponding to their step.
 * ```js
 *    { 
 *       clamp : 'clamp(1rem, 0.93rem + 0.36vw, 1.25rem)',
 *       min : {
 *        fontSize: 14.05,
 *         width: 320,
 *         scale : 1.25
 *          },
 *          max : {
 *              fontSize: 17.57,
 *              width: 1440,
 *              scale : 1.25
 *          }
 *        }
 *      
 * ```
 * @example 
 * ```js
*   stepValues({
      min: {
        width: 320,
        fontSize: 16,
        typeScale: TypographyScaleValues[scale].value,
      },
      max: {
        width: 1440,
        fontSize: 20,
        typeScale: TypographyScaleValues[scale].value,
      },
      step : 1
  });
  ```
 */
export function stepValues({min, max, step}: {
  min: ViewPortProps;
  max?: ViewPortProps;
  step: number;
}) {
    const valueMin = round(
      min.fontSize * Math.pow(min.typeScale, step)
    );

    const valueMax = max ? round(
      max.fontSize * Math.pow(max.typeScale, step)
    ) : undefined;

    return {
      min: {
        fontSize: valueMin,
        width: min.width,
        typeScale: min.typeScale,
      },
      max: valueMax && max ? {
        fontSize: valueMax,
        width: max.width,
        typeScale: max.typeScale,
      } : undefined,
      clamp: valueMax && max ? clampBuilder(
        min.width,
        max.width,
        valueMin,
        valueMax
      ) : numberToRem(valueMin),
    }
}