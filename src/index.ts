#!/usr/bin/env node
import inquirer from 'inquirer';
import kleur from 'kleur';
import {scaleSteps} from './utils/scales';

const questions = [
  {
    type: 'input',
    name: 'type_scale',
    message: "What type scale do you want to use?",
    choices: Object.keys(scaleSteps),
    filter(val:string) {
        return val.toLowerCase();
      },
  }
];


export function cli() {
  inquirer.prompt(questions).then((answers) => {
    console.log(JSON.stringify(answers, null, '  '));
  });
}

cli()