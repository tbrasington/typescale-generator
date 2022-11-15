---
"@initiate-ui/typescale-generator": major
---

# what

Move from min and max to sizes

# why

This is more flexible and allows for more control over the scale for tools like Figma that may need granular access to specific sizes at certain breakpoints (or classic css media queries)

# how

Old method

```typescript
const scale = buildTypographyScales({
  range: [-1, 0, 2],
  min: {
    width: 320,
    fontSize: 16,
    typeScale: TypographyScaleValues.MINOR_SECOND.value,
  },
  max: {
    width: 1440,
    fontSize: 20,
    typeScale: TypographyScaleValues.PERFECT_FOURTH.value,
  },
});
```

New method

```typescript
const scale = buildTypographyScales({
  range: [-1, 0, 2],
  sizes: [
    {
      $name: "BP1",
      width: 320,
      fontSize: 16,
      typeScale: TypographyScaleValues.MINOR_SECOND.value,
    },
    {
      $name: "BP2",
      width: 768,
      fontSize: 18,
      typeScale: TypographyScaleValues.PERFECT_FOURTH.value,
    },
    {
      $name: "BP3",
      width: 1440,
      fontSize: 20,
      typeScale: TypographyScaleValues.PERFECT_FOURTH.value,
    },
  ],
});
```
