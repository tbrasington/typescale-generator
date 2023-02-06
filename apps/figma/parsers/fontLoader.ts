import { getWeightName } from "@initiate-ui/typescale-generator";
import { FontValueProps } from "../api/projects";
import { getFigmaFontStyle } from "./utils";

//const container =
export function fontsToLoadInFigma(styles: FontValueProps[]) {
  const fontsToLoad = [];
  for (const property in styles) {
    // get the text style values
    const textStyle = styles[property];

    const weight = getWeightName(Number(textStyle.fontWeight) || 400);
    // figma uses real type faces so we have to only add italic or oblique if its there
    const normalizedFontStyle = getFigmaFontStyle(
      weight,
      textStyle.fontStyle || "normal"
    );

    if (textStyle.fontFamily) {
      fontsToLoad.push({
        family: textStyle.fontFamily,
        style: normalizedFontStyle,
      });
    }
  }
  return fontsToLoad;
}
