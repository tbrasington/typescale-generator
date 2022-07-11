/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type { InitialOptionsTsJest } from "ts-jest";
import { jsWithTsESM as tsjPreset } from "ts-jest/presets";

const config: InitialOptionsTsJest = {
  transform: {
    ...tsjPreset.transform,
  },
};

export default config;
