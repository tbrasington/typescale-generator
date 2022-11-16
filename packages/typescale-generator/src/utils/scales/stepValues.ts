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
export function stepValues({ step, sizes}: {

  sizes: ViewPortProps[];
  step: number;
}) {

  const min = sizes && sizes[0];
    const valueMin = round(
      min.fontSize * Math.pow(min.typeScale, step)
    );

    // array
    const values = sizes.map((size) => {
      return {...size, fontSize: round(size.fontSize * Math.pow(size.typeScale, step))};
    });


    const maxLength =  sizes.length -1
    const max = sizes && maxLength>=1 && sizes[maxLength]
    const valueMax = max && sizes[maxLength]  ? round(
      sizes[maxLength].fontSize * Math.pow(sizes[maxLength].typeScale, step)
    ) : undefined;

    return {
      step : step,
      sizes: values,
      clamp: valueMax && max ? clampBuilder(
        min.width,
        max.width,
        valueMin,
        valueMax
      ) : numberToRem(valueMin),
    }
}