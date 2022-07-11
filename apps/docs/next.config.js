const withTM = require("next-transpile-modules")(["@initate/typescale-generator"]);

module.exports = withTM({
  reactStrictMode: true,
});
