import {
  loadFontsAsync,
  on,
  once,
  showUI,
} from "@create-figma-plugin/utilities";

import { InsertCodeHandler } from "./types";

import textStyles from "./starters/utilitarian/styles.js";

type StyleProps = keyof typeof textStyles.styles;

export default function () {
  async function loadAllFonts() {
    const fontsToLoad = [];
    for (const property in textStyles.styles) {
      // get the text style values
      const textStyle = textStyles.styles[property as StyleProps];

      fontsToLoad.push({
        family: textStyle.$value.fontFamily,
        style: "Regular",
      });
    }
    console.log({ fontsToLoad });
    return Promise.all(
      fontsToLoad.map(async (font) => await figma.loadFontAsync(font))
    );
  }

  on<InsertCodeHandler>("INSERT_CODE", async function () {
    await loadAllFonts();

    for (const property in textStyles.styles) {
      // get the text style values
      const textStyle = textStyles.styles[property as StyleProps];

      // do the ting
      const exisitingStyles = figma.getLocalTextStyles();

      const matchedStyle = exisitingStyles.find(
        (style) =>
          style.id ===
          style.getPluginData(`${textStyles.namespace}-${property}`)
      );
      // if we have a match, lets update it rather than dupe it
      const style = matchedStyle ? matchedStyle : figma.createTextStyle();

      // set the name
      style.name = property;
      style.fontName = {
        family: textStyle.$value.fontFamily,
        style: "Regular",
      };

      // set the font size
      style.fontSize = textStyle.$value.fontSize;

      // save the id for later usage
      if (matchedStyle === undefined) {
        style.setPluginData(`${textStyles.namespace}-${property}`, style.id);
      }
    }
    figma.closePlugin();
  });
  showUI({ width: 320, height: 240 });
}
