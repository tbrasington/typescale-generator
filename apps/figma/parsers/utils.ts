import {
  convertFontStyle,
  FontStyleProps,
} from "@initiate-ui/typescale-generator";

/**
 * Converts normal font style into regular, then appends italic or oblique if needed
 * @param weight
 * @param fontStyle
 * @returns
 */
export function getFigmaFontStyle(
  weight: string,
  fontStyle: string = "normal"
) {
  const convertedFontStyle = convertFontStyle(fontStyle as FontStyleProps);
  let normalizedFontStyle = weight;
  /*
          IF the typeface is normal and has italicOblique, remove the weight
          IF italicOblique is null, do not add it
      */

  if (weight === "Normal" && convertedFontStyle) {
    normalizedFontStyle = convertedFontStyle;
  }
  if (
    weight !== "Normal" &&
    convertedFontStyle &&
    convertedFontStyle !== "Regular"
  ) {
    normalizedFontStyle = weight + " " + convertedFontStyle;
  }

  return normalizedFontStyle;
}

/**
 * Converts a line height into a "percentage" e.g. 1.2 becomes 120
 * @param lineHeight
 * @returns 1.2 => 120
 */
export function convertLineHeight(lineHeight: number) {
  return Number(lineHeight ? lineHeight : 1) * 100;
}

export function converLetterSpacing(letterSpacing: string | number) {
  let unit: "PIXELS" | "PERCENT" = "PERCENT";
  const removePx = letterSpacing.toString().replace("px", "");
  let value = Number(removePx);

  if (typeof letterSpacing === "string") {
    if (letterSpacing.includes("px")) {
      unit = "PIXELS";
    } else {
      unit = "PERCENT";
    }
  }
  if (typeof letterSpacing === "number") {
    unit = "PERCENT";
  }
  return { unit: unit, value: value };
}
