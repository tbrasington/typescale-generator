import {
  TextStylesProps,
  TokensProps,
  FontValueProps,
  PermutationProps,
} from "../api/projects";

function isObject(obj: any) {
  for (var i in obj) return false;
  return true;
}
export function splitTokenReference(string: string) {
  return string.replace("{", "").replace("}", "").split(".");
}

export function findReferenceValue(string: string[], tokens: object) {
  return string.reduce((o: any, i) => o?.[i], tokens);
}

type BuildPermProps = {
  $name: string;
  $values: FontValueProps;

  $permutations: PermutationProps[];
};
function buildPermutations({ $name, $values, $permutations }: BuildPermProps) {
  if ($permutations) {
    const name = $name;
    const values = $values;
    const newStyle = {
      name: name,
      ...values,
    };

    $permutations?.map((permutation: any) => {
      console.log({ permutation });
    });
  }
}
const flatten = (arr, current = [], result = []) => {
  if (!arr.length) {
    console.log({ current });
    result.push(current);
    return;
  }

  for (const item of arr[0].$value) {
    flatten(arr.slice(1), [...current, item], result);
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
    if (styles[styleName].$permutations) {
      const combinations = flatten(styles[styleName].$permutations)?.map(
        (c) => {
          console.log({ c });
          return c.map((item) => item.$name).join("/");
        }
      );
      console.log({ combinations });
    }

    // make the style
    const values = styles[styleName]?.$value;
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
        values[prop] = token;
      }
    });
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
