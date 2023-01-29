export function splitTokenReference(string: string) {
  return string.replace("{", "").replace("}", "").split(".");
}

export function findReferenceValue(string: string[], tokens: object) {
  return string.reduce((o: any, i) => o?.[i], tokens);
}

function parseTokens(styles, tokens) {
  const FigmaStyles: FontValueProps[] = [];

  Object.keys(styles).forEach(function (styleName, index) {
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

      if (prop === "fontScale" && typeof token === "number") {
        const scale = arrayOfSizes.find((size) => size.step === token);
        if (scale && scale.sizes) {
          // values["fontSizes"] = scale.sizes;
          scale.sizes.forEach((size) => {
            FigmaStyles.push({
              name: `${styleName}/${size.$name}`,
              ...values,
              fontSize: size.fontSize,
            });
          });
        } else {
          throw new Error("could not find scale");
        }
      }
    });
  });
}
