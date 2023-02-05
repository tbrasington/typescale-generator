import {
  TextStylesProps,
  TokensProps,
  FontValueProps,
  PermutationProps,
  TokenValueProps,
} from "../api/projects";

export function splitTokenReference(string: string) {
  return string.replace("{", "").replace("}", "").split(".");
}

export function findReferenceValue(string: string[], tokens: object) {
  return string.reduce((o: any, i) => o?.[i], tokens);
}

export function parseValuesToTakens(
  _values: FontValueProps,
  tokens: TokensProps
) {
  let values = _values;

  Object.keys(values).forEach(function (prop) {
    const token = values[prop as keyof FontValueProps];
    // is it a reference?
    if (token && typeof token === "string" && token.match("{") !== null) {
      const tokenReference = splitTokenReference(token);
      const tokenValue = findReferenceValue(tokenReference, tokens);

      // mutate data
      values[prop as keyof FontValueProps] = tokenValue?.$value;
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
  result: TokenValueProps[] = []
) => {
  if (arr && !arr.length) {
    result.push(current as unknown as TokenValueProps);
    return;
  }
  if (arr) {
    for (const item of arr[0].$value) {
      flatten(arr.slice(1), [...current, item], result);
    }
    return result as TokenValueProps[];
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
  const FigmaStyles: FontValueProps[] = [];

  Object.keys(styles).forEach(function (styleName, index) {
    // how many different styles do we need
    let combinations;

    if (styles[styleName].$permutations) {
      combinations = flatten(styles[styleName].$permutations, [], []);
      console.log({ combinations });
    }

    // make the style
    const values = parseValuesToTakens(styles[styleName]?.$value, tokens);
    // Object.keys(values).forEach(function (prop) {
    //   const token = values[prop as keyof FontValueProps];
    //   // is it a reference?
    //   if (token && typeof token === "string" && token.match("{") !== null) {
    //     const tokenReference = splitTokenReference(token);
    //     const tokenValue = findReferenceValue(tokenReference, tokens);

    //     // mutate data
    //     values[prop as keyof FontValueProps] = tokenValue?.$value;
    //   } else {
    //     // mutate data
    //     values[prop] = token;
    //   }
    // });
    FigmaStyles.push({
      name: `${styleName}`,
      ...values,
    });
  });
  return FigmaStyles;
}

// if (prop === "fontScale" && typeof token === "number") {
//   const scale = arrayOfSizes.find((size) => size.step === token);
//   if (scale && scale.sizes) {
//     // values["fontSizes"] = scale.sizes;
//     scale.sizes.forEach((size) => {
//       FigmaStyles.push({
//         name: `${styleName}/${size.$name}`,
//         ...values,
//         fontSize: size.fontSize,
//       });
//     });
//   } else {
//     throw new Error("could not find scale");
//   }
// }
