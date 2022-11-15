import { GenericKeyValueProps, TypeScaleProps } from "../interfaces";

/**
 * @returns An object of the steps with the min and max unit values, paired with the maxwidth.
 * @example ```js
 *
 * ```
 */

export function generateObjectPairs({ scales }: { scales: TypeScaleProps }) {
   
  const remap = Object.keys(scales).map((item) => {
 
    return {
      step: item,
      fontSize: {
        ...scales[item].sizes
      },
    };
  });

  return remap;
}
