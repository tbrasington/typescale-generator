#!/usr/bin/env node
import inquirer from "inquirer";
import kleur from "kleur";
import { generateNamedScales, TypographyScaleValues } from "./utils/scales";
import { generateCSS } from "./utils/scales/generateCSS";
import { generateObject } from "./utils/scales/generateObject";
import fs from "fs-extra";

const Formats = [
  {
    name: "CSS variables",
    value: "css",
  },
  {
    name: "Javascript object",
    value: "js",
  },
  // {
  //   name: "Typescript object",
  //   value: "js",
  // },
  // {
  //   name: "Design tokens spec JSON",
  //   value: "json",
  // },
];
const questions = [
  {
    type: "list", // replace with select https://github.com/SBoudrias/Inquirer.js/tree/master/packages/select
    name: "type_scale",
    message: "What type scale do you want to use?",
    choices: Object.keys(TypographyScaleValues).map(
      (key) =>
        `${TypographyScaleValues[key].name} (${TypographyScaleValues[key].value})`
    ),
    filter(val: string) {
      return val.split("(")[0].trim().toUpperCase().replace(" ", "_");
    },
  },
  {
    type: "checkbox",
    name: "formats",
    message: "What formats do you want to generate?",
    choices: Formats.map((item) => item.name),
    filter(val: string[]) {
      return val.map(
        (item) => Formats.find((format) => format.name === item)?.value
      );
    },
    validate(val: string[]) {
      if (val.length < 1) {
        return "You must choose at least one format";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "file",
    message: "Where should we save the files?",
    default: "./samples",
  },
];

export function cli() {
  inquirer.prompt(questions).then((answers) => {
    //console.log(JSON.stringify(answers, null, "  "));

    // work out if it can save in the folder the user has prompted

    const ScaleValues = generateNamedScales(answers.type_scale).typeScale;
    // these all need to be options that toggle depending on choices

    // generate object for JS/TS users using CSS
    const typeSteps = generateObject({ scales: ScaleValues });

    // generate JS/TS object justing using the min/max values
    if (answers.formats.find((item: string) => item === "js")) {
      const jsFile = `${answers.file}/index.js`;
      fs.outputFile(
        jsFile,
        `export const typeScale = ${JSON.stringify(typeSteps, null, "  ")}`
      )
        .then(() => fs.readFile(jsFile, "utf8"))
        .then((data) => {
          console.log(kleur.green().bold("index.js file created!"));
        })
        .catch((err) => {
          console.error(err);
        });
    }

    // generate a CSS file using the clamp values + a fall back with breakpoints
    if (answers.formats.find((item: string) => item === "css")) {
      const typeStepsCSS = generateCSS({ scales: ScaleValues });
      const cssFile = `${answers.file}/index.css`;
      fs.outputFile(cssFile, typeStepsCSS)
        .then(() => fs.readFile(cssFile, "utf8"))
        .then((data) => {
          console.log(kleur.green().bold("index.css file created!"));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
}

cli();
