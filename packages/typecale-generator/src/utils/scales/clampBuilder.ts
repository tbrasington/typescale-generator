import { round } from "../round";

/**
 * @returns An object of CSS clamped values based on a min/max viewport size and font-size.
 * ```
   'clamp(1rem, 0.93rem + 0.36vw, 1.25rem)'
 * ```
 * @example ```js
  clampBuilder(
    320,
    1440,
    14.05,
    17.57
   )
 * ```
 */
export function clampBuilder(
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
