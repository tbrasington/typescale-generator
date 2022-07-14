import { RangeProps } from ".";

/** 
* 
* Generates a range of numbers to use as the steps in the typography scale
* @returns [-2, -1, 0, 1, 2, 3, 4, 5]
*/
export function generateRange({min, max} : RangeProps)  {
  return Array.from(new Array(max + 1 + -1 * min), (_x, i) => i + min);
}
