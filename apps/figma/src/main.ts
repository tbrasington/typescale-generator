import {
  loadFontsAsync,
  on,
  once,
  showUI,
} from "@create-figma-plugin/utilities";

import { InsertCodeHandler } from "./types";

import textStyles from "./starters/utilitarian/styles.js";
import {
  convertFontStyle,
  getWeightName,
} from "@initiate-ui/typescale-generator";
import type { FontStyleProps } from "@initiate-ui/typescale-generator";

type TextStyleProps = keyof typeof textStyles.styles;

export default function () {
  async function loadAllFonts() {
    const fontsToLoad = [];
    for (const property in textStyles.styles) {
      // get the text style values
      const textStyle = textStyles.styles[property as TextStyleProps];

      const weight = getWeightName(textStyle.$value.fontWeight);
      // figma uses real type faces so we have to only add italic or oblique if its there
      const normalizedFontStyle = getFigmaFontStyle(
        weight,
        textStyle.$value.fontStyle as FontStyleProps
      );

      fontsToLoad.push({
        family: textStyle.$value.fontFamily,
        style: normalizedFontStyle,
      });
    }

    return Promise.all(
      fontsToLoad.map(
        async (font) =>
          await figma
            .loadFontAsync(font)
            .then(() => {
              return { font, status: "loaded" };
            })
            .catch(() => {
              return { font, status: "failed" };
            })
      )
    );
  }

  on<InsertCodeHandler>("INSERT_CODE", async function () {



    await loadAllFonts()
      .then((status) => {
        console.log({ status });

        const textStylestoParse = textStyles.styles;
        // loop through
        for (const property in textStylestoParse) {
          // get the text style values
          const textStyle = textStyles.styles[property as TextStyleProps];

          const failedLoad = status.find(
            (item) =>
              item.font.family === textStyle.$value.fontFamily &&
              item.status === "failed"
          );

          if (failedLoad) {
            figma.notify(
              `We couldn't load in ${textStyle.$value.fontFamily} on the style ${property}`
            );
          } else {
            // do the ting
            const exisitingStyles = figma.getLocalTextStyles();

            const matchedStyle = exisitingStyles.find(
              (style) =>
                style.id ===
                style.getPluginData(`${textStyles.namespace}-${property}`)
            );
            // if we have a match, lets update it rather than dupe it
            const figmaTextStyle = matchedStyle
              ? matchedStyle
              : figma.createTextStyle();
            const weight = getWeightName(textStyle.$value.fontWeight);
            const normalizedFontStyle = getFigmaFontStyle(
              weight,
              textStyle.$value.fontStyle as FontStyleProps
            );

            // set the name
            figmaTextStyle.name = property;
            figmaTextStyle.fontName = {
              family: textStyle.$value.fontFamily,
              style: normalizedFontStyle,
            };

            // set the font size
            figmaTextStyle.fontSize = textStyle.$value.fontSize;

            // set the line height
            figmaTextStyle.lineHeight = {
              unit: "PERCENT",
              value: convertLineHeight(textStyle.$value.lineHeight),
            };

            //letterspacing
            const letterSpacing = converLetterSpacing(
              textStyle.$value.letterSpacing
            );
            figmaTextStyle.letterSpacing = {
              unit: letterSpacing.unit,
              value: letterSpacing.value,
            };

            // save the id for later usage
            if (matchedStyle === undefined) {
              figmaTextStyle.setPluginData(
                `${textStyles.namespace}-${property}`,
                figmaTextStyle.id
              );
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    figma.closePlugin();
  });
  showUI({ width: 320, height: 240 });
}

/**
 * Converts normal font style into regular, then appends italic or oblique if needed
 * @param weight
 * @param fontStyle
 * @returns
 */
function getFigmaFontStyle(weight: string, fontStyle: FontStyleProps) {
  const convertedFontStyle = convertFontStyle(fontStyle);
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


function splitTokenReference(string: string) {
  return string.replace("{", "").replace("}", "").split(".");
}

function findReferenceValue(string: string[], tokens: object) {
  return string.reduce((o: any, i) => o?.[i], tokens);
}