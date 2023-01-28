const path = require("path");
module.exports = {
  stories: ["../ui-src/**/*.mdx", "../ui-src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  core: {
    builder: "@storybook/builder-vite", // 👈 The builder enabled here.
  },
  framework: {
    name: "@storybook/react-vite",
  },
  docs: {
    autodocs: "tag",
  },
};
