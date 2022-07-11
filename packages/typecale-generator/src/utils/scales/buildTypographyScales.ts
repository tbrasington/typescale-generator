import { ViewPortProps, GeneratedNamedScalesProps } from ".";
import { round } from "../round";
import { clampBuilder } from "./clampBuilder";

/**
 * @returns An object of CSS clamped values and their min and max number values, corresponding to their step.
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
     range: [-2, -1, 0, 1, 2, 3, 4, 5],
  });
  ```
 */
export function buildTypographyScales(opts: {
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
      min: {
        fontSize: valueMin,
        width: minViewport.width,
        typeScale: minViewport.typeScale,
      },
      max: {
        fontSize: valueMax,
        width: minViewport.width,
        typeScale: minViewport.typeScale,
      },
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
