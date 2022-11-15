// flow for testing

// this will have to be fetch in the real world so will need types

function splitTokenReference(string: string) {
  return string.replace("{", "").replace("}", "").split(".");
}

function findReferenceValue(string: string[], tokens: object) {
  return string.reduce((o: any, i) => o?.[i], tokens);
}

async function get() {
  const req = await fetch("/styles.json");
  const fontStyleData = await req.json();

  //const config = fontStyleData.config;
  const tokens = fontStyleData.tokens;
  const styles = fontStyleData.styles;

  // loop through styles

  Object.keys(styles).forEach(function (styleName, index) {
    const values = styles[styleName]?.$value;
    Object.keys(values).forEach(function (prop) {
      const token = values[prop];
      // is it a reference?
      if (token && typeof token === "string" && token.match("{") !== null) {
        const tokenReference = splitTokenReference(token);
        const tokenValue = findReferenceValue(tokenReference, tokens);
        console.log({ type: prop, value: tokenValue?.$value });
      } else {
        console.log({ type: prop, value: token });
      }
    });
  });
}

get();

export default get