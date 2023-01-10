export type FontStyleProps = "ITALIC" | "OBLIQUE" | "REGULAR";
/**
 *
 * @param value
 * @returns normalised name of style for
 */
export function convertFontStyle(value: FontStyleProps) {
  switch (value.toUpperCase()) {
    case "ITALIC":
      return "Italic";
    case "OBLIQUE":
      return "Oblique";
    default:
      return "Regular";
  }
}
