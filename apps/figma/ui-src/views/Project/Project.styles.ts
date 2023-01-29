import { styled, theme } from "../../styles/stitches.config";

export const container = styled("li", {
  display: "flex",
});

export const list = styled("ul", {
  display: "flex",
  flexDirection: "column",
  listStyle: "none",
  margin: 0,
  width: "100%",
  padding: ` 0 ${theme.space.lg}`,
  gap: theme.space.none,
  border: "1px solid",
  borderColor: theme.colors.dividers,
  borderRadius: theme.radii.card,
  "& > li + li": {
    borderTop: "1px solid",
    borderColor: theme.colors.dividers,
  },
});

export const item = styled("li", {
  display: "flex",
  flexDirection: "column",
  padding: `${theme.space.lg} 0`,
  gap: theme.space.lg,
});

export const itemLabelValue = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: theme.space.none,
});
