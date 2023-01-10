# @initate/typescale-generator

## 2.0.1

### Patch Changes

- e3470db: patched in step to object for filtering

## 2.0.0

### Major Changes

- e8557b3: # what

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
      typeScale: TypographyScaleValues.MINOR_SECOND.value
    },
    max: {
      width: 1440,
      fontSize: 20,
      typeScale: TypographyScaleValues.PERFECT_FOURTH.value
    }
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
        typeScale: TypographyScaleValues.MINOR_SECOND.value
      },
      {
        $name: "BP2",
        width: 768,
        fontSize: 18,
        typeScale: TypographyScaleValues.PERFECT_FOURTH.value
      },
      {
        $name: "BP3",
        width: 1440,
        fontSize: 20,
        typeScale: TypographyScaleValues.PERFECT_FOURTH.value
      }
    ]
  });
  ```

## 1.0.3

### Patch Changes

- 0d938d6: Change typings

## 1.0.2

### Patch Changes

- 9846189: compiler options

## 1.0.1

### Patch Changes

- bbee9ea: package json fix

## 1.0.0

### Major Changes

- e034700: release

## 0.0.9

### Patch Changes

- 3c2592b: build

## 0.0.8

### Patch Changes

- 99ed5c8: Provide commonjs exports

## 0.0.7

### Patch Changes

- 869e426: Actually expose functions

## 0.0.6

### Patch Changes

- 4078de6: Exposed additional functions and better typings for available scales

  Functions:

  - generateRange,
  - generateCSS,
  - generateObject

## 0.0.5

### Patch Changes

- 55bf103: Full terminal commands and exposed functions for building apps off the scales

## 0.0.4

### Patch Changes

- dc46fb7: Removed formats not yet supported + and only generate files selected
- cad8fbf: Changed the namespace of the package org

## 0.0.3

### Patch Changes

- dc46fb7: Removed formats not yet supported + and only generate files selected

## 0.0.2

### Patch Changes

- c7c743b: Testing workflow added, better tsdocs
