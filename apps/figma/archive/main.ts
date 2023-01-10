// import { on, showUI } from "@create-figma-plugin/utilities";

// import { FontStyleDataProps, FontValueProps, InsertCodeHandler } from "./types";

// import {
//   buildTypographyScales,
//   convertFontStyle,
//   getWeightName,
// } from "@initiate-ui/typescale-generator";
// import type { FontStyleProps } from "@initiate-ui/typescale-generator";

// export default function () {
//   async function loadAllFonts(styles: FontValueProps[]) {
//     const fontsToLoad = [];
//     for (const property in styles) {
//       // get the text style values
//       const textStyle = styles[property];

//       const weight = getWeightName(Number(textStyle.fontWeight) || 400);
//       // figma uses real type faces so we have to only add italic or oblique if its there
//       const normalizedFontStyle = getFigmaFontStyle(
//         weight,
//         textStyle.fontStyle || "normal"
//       );

//       if (textStyle.fontFamily) {
//         fontsToLoad.push({
//           family: textStyle.fontFamily,
//           style: normalizedFontStyle,
//         });
//       }
//     }

//     return Promise.all(
//       fontsToLoad.map(
//         async (font) =>
//           await figma
//             .loadFontAsync(font)
//             .then(() => {
//               return { font, status: "loaded" };
//             })
//             .catch(() => {
//               return { font, status: "failed" };
//             })
//       )
//     );
//   }

//   on("INSERT_FILE", async (fontStyleData: FontStyleDataProps) => {
//     // work out what styles we need remap

//     const config = fontStyleData.config;
//     const tokens = fontStyleData.tokens;
//     const styles = fontStyleData.styles;

//     if (!config || !tokens || !styles) {
//       figma.notify("No config, tokens or styles found in the file");
//       return;
//     }

//     // set the config up
//     const scaleSettings = buildTypographyScales({ ...config });

//     // get all the available breakpoint sizes for automating stlyes
//     const arrayOfSizes = Object.entries(scaleSettings.typeScale).map((item) => {
//       return {
//         name: item[0],
//         ...item[1],
//       };
//     });

//     // parse and remap our tokens into something figma can use
//     const FigmaStyles: FontValueProps[] = [];

//     Object.keys(styles).forEach(function (styleName, index) {
//       const values = styles[styleName]?.$value;
//       Object.keys(values).forEach(function (prop) {
//         const token = values[prop as keyof FontValueProps];
//         // is it a reference?
//         if (token && typeof token === "string" && token.match("{") !== null) {
//           const tokenReference = splitTokenReference(token);
//           const tokenValue = findReferenceValue(tokenReference, tokens);

//           // mutate data
//           values[prop as keyof FontValueProps] = tokenValue?.$value;
//         } else {
//           // mutate data
//           values[prop] = token;
//         }

//         if (prop === "fontScale" && typeof token === "number") {
//           const scale = arrayOfSizes.find((size) => size.step === token);
//           if (scale && scale.sizes) {
//             // values["fontSizes"] = scale.sizes;
//             scale.sizes.forEach((size) => {
//               FigmaStyles.push({
//                 name: `${styleName}/${size.$name}`,
//                 ...values,
//                 fontSize: size.fontSize,
//               });
//             });
//           } else {
//             throw new Error("could not find scale");
//           }
//         }
//       });
//     });

//     console.log({ FigmaStyles });

//     // load all the fonts
//     await loadAllFonts(FigmaStyles)
//       .then((status) => {
//         console.log({ status });

//         // loop through
//         FigmaStyles.forEach((textStyle, index) => {
//           // get the text style values

//           const failedLoad = status.find(
//             (item) =>
//               item.font.family === textStyle.fontFamily &&
//               item.status === "failed"
//           );

//           if (failedLoad) {
//             figma.notify(
//               `We couldn't load in ${textStyle.fontFamily} on the style ${textStyle.name}`
//             );
//           } else {
//             // do the ting
//             const exisitingStyles = figma.getLocalTextStyles();

//             const matchedStyle = exisitingStyles.find(
//               (style) => style.id === style.getPluginData(`${textStyle.name}`)
//             );
//             // if we have a match, lets update it rather than dupe it
//             const figmaTextStyle = matchedStyle
//               ? matchedStyle
//               : figma.createTextStyle();
//             const weight = getWeightName(Number(textStyle.fontWeight));
//             const normalizedFontStyle = getFigmaFontStyle(
//               weight,
//               textStyle.fontStyle as FontStyleProps
//             );

//             // set the name
//             figmaTextStyle.name = textStyle.name || `Untitled-${index}`;

//             if (textStyle.fontFamily) {
//               figmaTextStyle.fontName = {
//                 family: textStyle.fontFamily,
//                 style: normalizedFontStyle,
//               };

//               // set the font size
//               if (textStyle.fontSize) {
//                 figmaTextStyle.fontSize = Number(textStyle.fontSize);
//               } else {
//                 figma.notify(`No font size found for ${textStyle.name}`);
//               }

//               // set the line height

//               if (textStyle.lineHeight) {
//                 figmaTextStyle.lineHeight = {
//                   unit: "PERCENT",
//                   value: convertLineHeight(Number(textStyle.lineHeight)),
//                 };
//               }

//               //letterspacing
//               if (textStyle.letterSpacing) {
//                 const letterSpacing = converLetterSpacing(
//                   textStyle.letterSpacing
//                 );
//                 figmaTextStyle.letterSpacing = {
//                   unit: letterSpacing.unit,
//                   value: letterSpacing.value,
//                 };
//               }

//               // save the id for later usage
//               if (matchedStyle === undefined) {
//                 figmaTextStyle.setPluginData(
//                   `${textStyle.name}`,
//                   figmaTextStyle.id
//                 );
//               }
//             } else {
//               figma.notify(`No font family found on ${textStyle.name}`);
//             }
//           }
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   showUI({ width: 320, height: 240 });
// }

// /**
//  * Converts normal font style into regular, then appends italic or oblique if needed
//  * @param weight
//  * @param fontStyle
//  * @returns
//  */
// function getFigmaFontStyle(weight: string, fontStyle: string = "normal") {
//   const convertedFontStyle = convertFontStyle(fontStyle as FontStyleProps);
//   let normalizedFontStyle = weight;
//   /*
//           IF the typeface is normal and has italicOblique, remove the weight
//           IF italicOblique is null, do not add it
//       */

//   if (weight === "Normal" && convertedFontStyle) {
//     normalizedFontStyle = convertedFontStyle;
//   }
//   if (
//     weight !== "Normal" &&
//     convertedFontStyle &&
//     convertedFontStyle !== "Regular"
//   ) {
//     normalizedFontStyle = weight + " " + convertedFontStyle;
//   }

//   return normalizedFontStyle;
// }

// /**
//  * Converts a line height into a "percentage" e.g. 1.2 becomes 120
//  * @param lineHeight
//  * @returns 1.2 => 120
//  */
// export function convertLineHeight(lineHeight: number) {
//   return Number(lineHeight ? lineHeight : 1) * 100;
// }

// export function converLetterSpacing(letterSpacing: string | number) {
//   let unit: "PIXELS" | "PERCENT" = "PERCENT";
//   const removePx = letterSpacing.toString().replace("px", "");
//   let value = Number(removePx);

//   if (typeof letterSpacing === "string") {
//     if (letterSpacing.includes("px")) {
//       unit = "PIXELS";
//     } else {
//       unit = "PERCENT";
//     }
//   }
//   if (typeof letterSpacing === "number") {
//     unit = "PERCENT";
//   }
//   return { unit: unit, value: value };
// }

// function splitTokenReference(string: string) {
//   return string.replace("{", "").replace("}", "").split(".");
// }

// function findReferenceValue(string: string[], tokens: object) {
//   return string.reduce((o: any, i) => o?.[i], tokens);
// }
