const withTM = require("next-transpile-modules")(["@initiate-ui/typescale-generator"]);

module.exports = withTM({
  reactStrictMode: true,
});
