import { GenericKeyValueProps, TypeScaleProps } from "../interfaces";

/**
 * @returns An object of the steps with the min and max unit values, paired with the maxwidth.
 * @example ```js
 *
 * ```
 */

export function generateObjectPairs({ scales }: { scales: TypeScaleProps }) {
   
  const remap = Object.keys(scales).map((item) => {
   const isMaxAvailable = (scales[item].max?.width !== undefined) ? true : false;

    return {
      step: item,
      fontSize: {
        [scales[item].min.width]: scales[item].min.fontSize,
        //@ts-ignore
        ...(isMaxAvailable && {[scales[item].max?.width] : scales[item].max?.fontSize})
      },
    };
  });

  return remap;
}
