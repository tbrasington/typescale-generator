import { globalCss } from "@stitches/react";
import { styled, theme } from "./stitches.config";
globalCss({
  "*": {
    boxSizing: "border-box",
  },
  body: {
    margin: 0,
    padding: 0,
  },
})();

export const Navigation = styled("nav", {
  display: "flex",
  borderBottom: "1px solid",
  borderColor: theme.colors.dividers,
  padding: theme.sizes.md,
});

export const Button = styled("button", {
  backgroundColor: theme.colors.button_default,
  borderRadius: theme.radii.cta,
  color: theme.colors.background,
  border: "none",
  margin: 0,
  padding: `${theme.sizes.sm} ${theme.sizes.md}`,
  fontFamily: theme.fonts.body,
  lineHeight: 2,
  fontWeight: theme.fontWeights.cta,
  letterSpacing: "0.02rem",
  "&:hover": {
    backgroundColor: theme.colors.button_default,
  },
  "&:active": {
    backgroundColor: theme.colors.button_active,
  },
});

export const Main = styled("main", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  padding: theme.sizes.md,
});

export const ToolBar = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.sizes.md,
  width: "100%",
  minHeight: theme.sizes.xl,
});
