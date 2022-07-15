import { stepValues } from ".";
import { ViewPortProps, GeneratedNamedScalesProps } from "../interfaces";

/**
 * 
 * @param opts.min the scale to use for generation
 * @param opts.range an array of numbers
 * @returns A generated set of scales using the specified scale, along with the min max sizes for a breakpoint
 * ```js
 *    {
 *      typeScale = {
 *         "0": {
 *           clamp : 'clamp(1rem, 0.93rem + 0.36vw, 1.25rem)',
 *           min : {
 *              fontSize: 14.05,
 *              width: 320,
 *              scale : 1.25
 *          },
 *          max : {
 *              fontSize: 17.57,
 *              width: 1440,
 *              scale : 1.25
 *          }
 *        }
 *      }
 *    }
 * ```
 * @example 
 * ```js
*   buildTypographyScales({
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
     range: [-2, -1, 0, 1, 2, 3, 4, 5],
  });
  ```
 */
export function buildTypographyScales(opts: {
  range: number[];
  min: ViewPortProps;
  max?: ViewPortProps;
}) {
  const { min, max, range } = opts;

  const system: GeneratedNamedScalesProps = {
    typeScale: {},
  };

  const minFluidTypeStep = range[0];
  const maxFluidTypeStep = range[range.length - 1];
  for (let i = minFluidTypeStep; i <= maxFluidTypeStep; i++) {
   
    system.typeScale[`step-${i}`] = stepValues({
      min: min,
      max: max,
      step: i,
    })
  }

  return {
    ...system,
  };
}