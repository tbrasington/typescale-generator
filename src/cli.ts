#!/usr/bin/env node
import inquirer from "inquirer";
import kleur from "kleur";
import { generateNamedScales, generateObject, TypographyScaleValues } from "./utils/scales";
import fs from 'fs-extra'
const questions = [
  {
    type: "list",
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
];

export function cli() {
  inquirer.prompt(questions).then((answers) => {
    console.log(JSON.stringify(answers, null, "  "));

    const ScaleValues = generateNamedScales(answers.type_scale).typeScale
    // these all need to be options that toggle depending on choices

    // generate JS/TS object justing using the min/max values

    // generate a CSS file using the clamp values + a fall back with breakpoints

    // generate a JSON file following the design tokens spec

    // generate object for JS/TS users using CSS
    const typeSteps = generateObject({ scales: ScaleValues })
    console.log(typeSteps);
    
    
    const file = 'samples/type-scale.ts'

    fs.outputFile(file, `export const typeScale = ${JSON.stringify(typeSteps, null, "  ")}`)
      .then(() => fs.readFile(file, "utf8"))
      .then((data) => {
        console.log(data); // => hello!
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

cli();
