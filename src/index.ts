#!/usr/bin/env node
import inquirer from 'inquirer';
import kleur from 'kleur';
import {TypographyScaleValues} from './utils/scales';

const questions = [
  {
    type: 'list',
    name: 'type_scale',
    message: "What type scale do you want to use?",
    choices: Object.keys(TypographyScaleValues).map(key => `${TypographyScaleValues[key].name} (${TypographyScaleValues[key].value})`),
    filter(val:string) {
        return val.split("(")[0].trim().toUpperCase().replace(' ', '_');
      },
  }
];


export function cli() {
  inquirer.prompt(questions).then((answers) => {
    console.log(JSON.stringify(answers, null, '  '));
  });
}

cli()