import { FontValueProps } from "../api/projects";
import {
  converLetterSpacing,
  convertLineHeight,
  getFigmaFontStyle,
} from "../parsers/utils";
import {
  FontStyleProps,
  getWeightName,
} from "@initiate-ui/typescale-generator";
figma.showUI(__html__, { themeColors: true, height: 300 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "sync-styles") {
    console.log({ styles: msg.typeData });
    console.log({ fonts: msg.fontsToLoad });
    const FigmaStyles = msg.typeData as FontValueProps[];
    await loadAllFonts(msg.fontsToLoad)
      .then((status) => {
        console.log({ status });

        // loop through
        FigmaStyles.forEach((textStyle, index) => {
          // get the text style values

          const failedLoad = status.find(
            (item) =>
              item.font.family === textStyle.fontFamily &&
              item.status === "failed"
          );

          if (failedLoad) {
            figma.notify(
              `We couldn't load in ${textStyle.fontFamily} on the style ${textStyle.name}`
            );
          } else {
            // do the ting
            const exisitingStyles = figma.getLocalTextStyles();

            const matchedStyle = exisitingStyles.find(
              (style) => style.id === style.getPluginData(`${textStyle.name}`)
            );
            // if we have a match, lets update it rather than dupe it
            const figmaTextStyle = matchedStyle
              ? matchedStyle
              : figma.createTextStyle();
            const weight = getWeightName(Number(textStyle.fontWeight));
            const normalizedFontStyle = getFigmaFontStyle(
              weight,
              textStyle.fontStyle as FontStyleProps
            );

            // set the name
            figmaTextStyle.name = textStyle.name || `Untitled-${index}`;

            if (textStyle.fontFamily) {
              figmaTextStyle.fontName = {
                family: textStyle.fontFamily,
                style: normalizedFontStyle,
              };

              // set the font size
              if (textStyle.fontSize) {
                figmaTextStyle.fontSize = Number(textStyle.fontSize);
              } else {
                figma.notify(`No font size found for ${textStyle.name}`);
              }

              // set the line height

              if (textStyle.lineHeight) {
                figmaTextStyle.lineHeight = {
                  unit: "PERCENT",
                  value: convertLineHeight(Number(textStyle.lineHeight)),
                };
              }

              //letterspacing
              if (textStyle.letterSpacing) {
                const letterSpacing = converLetterSpacing(
                  textStyle.letterSpacing
                );
                figmaTextStyle.letterSpacing = {
                  unit: letterSpacing.unit,
                  value: letterSpacing.value,
                };
              }

              // save the id for later usage
              if (matchedStyle === undefined) {
                figmaTextStyle.setPluginData(
                  `${textStyle.name}`,
                  figmaTextStyle.id
                );
              }
            } else {
              figma.notify(`No font family found on ${textStyle.name}`);
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

//figma.closePlugin();

async function loadAllFonts(fontsToLoad: { family: string; style: string }[]) {
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
