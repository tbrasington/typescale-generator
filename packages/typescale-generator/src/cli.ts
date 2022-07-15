#!/usr/bin/env node
import inquirer from "inquirer";
import kleur from "kleur";
import { buildTypographyScales } from "./utils/scales";
import { TypographyScaleValues } from "./utils/interfaces";
import { generateCSS } from "./utils/scales/generateCSS";
import { generateObject } from "./utils/scales/generateObject";
import { generateRange } from "./utils/scales/generateRange";
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

interface AnswerProps {
  type_scale: string;
  min_fontSize: number;
  min_width: number;
  add_max?: boolean;
  max_fontSize?: number;
  max_width?: number;
  step_max: number;
  step_min: number;
  formats: string[];
  file: string;
}
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
  {
    type: "number",
    name: "min_fontSize",
    message: "What is base font size 16?",
    default: 16,
  },
  {
    type: "number",
    name: "min_width",
    message: "What is smallest viewport width? e.g. 320",
    default: 320,
  },
  {
    type: "confirm",
    name: "add_max",
    message: "Do you want to add max width and font size?",
  },
  {
    type: "number",
    name: "max_fontSize",
    message: "What's the max font size?",
    when(answers: AnswerProps) {
      return answers.add_max;
    },
  },
  {
    type: "number",
    name: "max_width",
    message: "What's the max width?",
    when(answers: AnswerProps) {
      return answers.max_fontSize;
    },
  },
  {
    type: "number",
    name: "step_max",
    message: "What is the largest step you want to generate? e.g. 6",
    default: 6,
  },
  {
    type: "number",
    name: "step_min",
    message: "What is the smallest step you want to generate? e.g. -2",
    default: -2,
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
  inquirer.prompt(questions).then((answers: AnswerProps) => {
    // What range of steps, do they need?
    console.log({ answers });
    const RangeOfSteps = generateRange({
      min: answers.step_min,
      max: answers.step_max,
    });

    // assemble the config
    // only add a max if there is one
    const ScaleConfig = {
      min: {
        fontSize: answers.min_fontSize,
        width: answers.min_width,
        typeScale: TypographyScaleValues[answers.type_scale].value,
      },
      max:
        answers.max_fontSize && answers.max_width
          ? {
              fontSize: answers.max_fontSize,
              width: answers.max_width,
              typeScale: TypographyScaleValues[answers.type_scale].value,
            }
          : undefined,
    };
    // build the scale values out, with their css values, and min / max number values
    const ScaleValues = buildTypographyScales({
      ...ScaleConfig,
      range: RangeOfSteps,
    }).typeScale;

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
