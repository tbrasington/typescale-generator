import { GeneratedItemProps, GenericKeyValueProps, TypeScaleProps } from "../interfaces";


export function generateCSS({ scales }: { scales: TypeScaleProps; }) {
  const typeSteps: GenericKeyValueProps = {};

  for (const step of Object.keys(scales)) {
    typeSteps[`--${step}`] = `${scales[`${step}`].clamp};`;
  }

  return `:root ${JSON.stringify(typeSteps, null, "  ").replace(/"/g, "").replace(/,/g, "")}`;
}
