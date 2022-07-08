#!/usr/bin/env node
import inquirer from "inquirer";
import kleur from "kleur";
import { generateScales, generateTypeScript, TypographyScaleValues } from "./utils/scales";
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
    console.log(generateTypeScript({scales: generateScales().typeScale}));
    
    
    const file = 'samples/type-scale.ts'

    fs.outputFile(file, "hello!")
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
