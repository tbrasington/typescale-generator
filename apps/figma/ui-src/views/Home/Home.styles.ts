import { styled, theme } from "../../styles/stitches.config";

export const container = styled("li", {
  display: "flex",
});

export const list = styled("ul", {
  display: "flex",
  flexDirection: "column",
  listStyle: "none",
  margin: 0,
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
  padding: `${theme.space.lg} 0`,
});
