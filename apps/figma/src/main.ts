import { loadFontsAsync, once, showUI } from "@create-figma-plugin/utilities";

import { InsertCodeHandler } from "./types";

import textStyles from "./starters/utilitarian/styles.js";
export default function () {
  console.log({ textStyles });
  once<InsertCodeHandler>("INSERT_CODE", async function (code: string) {
    const text = figma.createText();
    await loadFontsAsync([text]);
    text.characters = code;
    figma.currentPage.selection = [text];
    figma.viewport.scrollAndZoomIntoView([text]);
    figma.closePlugin();
  });
  showUI({ width: 320, height: 240 });
}
