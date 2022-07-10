import { GeneratedItemProps, GenericKeyValueProps } from "./";


export function generateCSS({ scales }: { scales: GeneratedItemProps[]; }) {
  const typeSteps: GenericKeyValueProps = {};

  for (const step of Object.keys(scales)) {
    typeSteps[`--step-${step}`] = `${scales[parseInt(step)].clamp};`;
  }

  return `:root ${JSON.stringify(typeSteps, null, "  ").replace(/"/g, "").replace(/,/g, "")}`;
}
