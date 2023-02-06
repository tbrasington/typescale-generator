import {
  TextStylesProps,
  TokensProps,
  FontValueProps,
  PermutationProps,
  TokenValueProps,
} from "../api/projects";
import { stepValues } from "@initiate-ui/typescale-generator";

export function splitTokenReference(string: string) {
  return string.replace("{", "").replace("}", "").split(".");
}

// finds the value of token from the entire tokens object e.g. font.body.bold = 700
export function findReferenceValue(string: string[], tokens: object) {
  return string.reduce((o: any, i) => o?.[i], tokens);
}

export function parseValuesToTokens(
  _values: FontValueProps,
  tokens: TokensProps,
  /*
   * @param {string} breakpoint - The breakpoint to use for the font size scale if present
   */
  breakpoint?: string
) {
  let values = _values;

  // do we have a scale token present?
  const scaleConfig = tokens.typographyScale.$value;
  Object.keys(values).forEach(function (prop) {
    const token = values[prop as keyof FontValueProps];
    // is it a reference?
    if (token && typeof token === "string" && token.match("{") !== null) {
      const tokenReference = splitTokenReference(token);
      const tokenValue = findReferenceValue(tokenReference, tokens);
      //if its a type scale, do some math
      if (prop === "fontSize") {
        // need to do checks to see if its a number, scale, or percentage
        const step = Number(tokenReference[1].replace("step-", ""));
        const steps = stepValues({
          sizes: scaleConfig,
          step: step,
        });

        // find the size, and if not fall back to the first element
        const breakpointSize =
          steps.sizes.find((item) => item.$name === breakpoint) ||
          steps.sizes[0];

        values[prop as keyof FontValueProps] = breakpointSize?.fontSize;
      } else {
        // mutate data
        values[prop as keyof FontValueProps] = tokenValue?.$value;
      }
    } else {
      // mutate data
      if (token) values[prop] = token;
    }
  });

  return values;
}

const flatten = (
  arr?: PermutationProps[],
  current: TokenValueProps[] = [],
  result: Array<TokenValueProps[]> = []
) => {
  if (arr && !arr.length) {
    result.push(current);

    return;
  }
  if (arr) {
    for (const item of arr[0].$value) {
      flatten(arr.slice(1), [...current, item], result);
    }
    return result;
  }
  return result;
};

export function parseTokens({
  styles,
  tokens,
}: {
  styles: TextStylesProps;
  tokens: TokensProps;
}) {
  // setup the array for figma
  const FigmaStyles: FontValueProps[] = [];

  Object.keys(styles).forEach(function (styleName, index) {
    // now lets make the permutations
    // how many different styles do we need
    let combinations;

    if (styles[styleName].$permutations) {
      combinations = flatten(styles[styleName].$permutations, [], []);
      const styleList = combinations?.map((item) => {
        const name = item.map((i) => i.$name).join("/");

        // convert into a key=>value object
        const baseValue = item.map((i: TokenValueProps) => {
          return { [i.$type]: i.$value };
        });
        return { name, values: baseValue };
      });

      styleList?.forEach((style) => {
        const merged = Object.assign(
          {},
          styles[styleName]?.$value,
          ...style.values
        );

        // do we have multiple scales/breakpoints to render?
        const numberOfBreakpoints = tokens.typographyScale.$value.length;

        // if so loop
        if (numberOfBreakpoints > 1) {
          tokens.typographyScale.$value.forEach((breakpoint) => {
            const parse = parseValuesToTokens(merged, tokens, breakpoint.$name);
            FigmaStyles.push({
              name: `${styleName}/${style.name}/${breakpoint.$name}`,
              ...parse,
            });
          });
        } else {
          const parse = parseValuesToTokens(merged, tokens);
          // else just make the one style
          FigmaStyles.push({
            name: `${styleName}/${style.name}`,
            ...parse,
          });
        }
      });
    } else {
      // only one combo
      // make the style if no combinations present
      const values = parseValuesToTokens(styles[styleName]?.$value, tokens);

      // and now add to figma
      FigmaStyles.push({
        name: `${styleName}`,
        ...values,
      });
      return FigmaStyles;
    }
  });
  return FigmaStyles;
}
