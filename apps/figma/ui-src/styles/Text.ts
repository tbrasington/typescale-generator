import { styled, theme } from "./stitches.config";
export const Text = styled("span", {
  margin: 0,
  padding: 0,
  fontFamily: theme.fonts.body,
  "& a": {
    color: "inherit",
  },
  variants: {
    underlineLinks: {
      true: {
        "& a": {
          textDecoration: "underline",
        },
      },
      false: {
        "& a": {
          textDecoration: "none",
        },
      },
    },
    color: {
      base: {
        color: theme.colors.text,
      },
      focus: {
        color: theme.colors.text_focus,
      },
      muted: {
        color: theme.colors.text_muted,
      },
      link: {
        color: theme.colors.text_link,
      },
      highlight: {
        color: theme.colors.text_highlight,
      },
    },
    size: {
      main: {
        fontSize: theme.fontSizes.main,
      },
      minor: {
        fontSize: theme.fontSizes.small,
      },
      label: {
        fontSize: theme.fontSizes.label,
      },
    },
    weight: {
      body: {
        fontWeight: theme.fontWeights.body,
      },
      cta: {
        fontWeight: theme.fontWeights.cta,
      },
    },
    lineHeight: {
      body: {
        lineHeight: theme.lineHeights.body,
      },
      label: {
        lineHeight: theme.lineHeights.label,
      },
    },
  },

  defaultVariants: {
    color: "base",
    size: "main",
    weight: "body",
    lineHeight: "label",
    underlineLinks: true,
  },
});

export default Text;
