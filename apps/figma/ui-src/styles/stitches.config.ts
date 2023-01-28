// stitches.config.ts
import { createStitches } from "@stitches/react";

const colors = {
  black: ["#1C1D21", "#272727"],
  white: ["#FBFBFB"],
  gray: ["#34363B", "#A3A3A3", "#DFDFDF", "#ECEDF0"],
  purple: ["#6D3FFF"],
  blue: ["#008FFF", "#0066e8"],
};
export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      text: colors.gray[0],
      text_focus: colors.black[0],
      text_muted: colors.gray[1],
      text_highlight: colors.purple[0],
      text_link: colors.blue[0],
      dividers: colors.gray[2],
      background: colors.white[0],
      background_highlight: colors.gray[3],
      background_dimmed: colors.black[1],
      button_default: colors.blue[0],
      button_active: colors.blue[1],
    },
    fonts: {
      body: "Inter, sans-serif",
    },
    fontSizes: {
      main: "15px",
      small: "12px",
      label: "10px",
    },
    fontWeights: {
      body: 500,
      cta: 500,
    },
    lineHeights: {
      body: "1.5",
      label: "1.2",
    },
    sizes: {
      none: "0px",
      xxs: "2px",
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      xxl: "48px",
    },
    radii: {
      cta: "8px",
      card: "8px",
    },
    space: {
      none: "0px",
      xxs: "2px",
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      xxl: "48px",
    },
  },
  media: {
    bp1: "(min-width: 480px)",
  },
  utils: {
    mx: (value: number | string) => ({
      marginLeft: value,
      marginRight: value,
    }),
    px: (value: number | string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
  },
});
