[x] Expose size/scale/clamp as function from buildTypographyScales
[x] allow range to be inputted into generateNamedScale to pass buildTypographyScales
[] allow font size and width to be inputted into generatedNamedScales
[] allow config for min and max, or just one
[] render style/family tokens from a json/token file

- variable pairs of min font size + scale
- breakpoint variations?

```json
{
  "type styles": {
    "heading-level-1": {
      "$type": "typography",
      "$value": {
        "fontFamily": "Roboto",
        "fontSize": "42px",
        "fontWeight": "700",
        "letterSpacing": "0.1px",
        "lineHeight": "1.2"
      }
    },
    "microcopy": {
      "$type": "typography",
      "$value": {
        "fontFamily": "{font.serif}",
        "fontSize": "{font.size.smallest}",
        "fontWeight": "{font.weight.normal}",
        "letterSpacing": "0px",
        "lineHeight": "1"
      }
    }
  }
}
```

```json
{
  "brand": {
    "color": {
      "$type": "color",
      "acid green": {
        "$value": "#00ff66"
      },
      "hot pink": {
        "$value": "#dd22cc"
      }
    },
    "typeface": {
      "$type": "fontFamily",
      "primary": {
        "$value": "Comic Sans MS"
      },
      "secondary": {
        "$value": "Times New Roman"
      }
    }
  }
}
```

```json
{
  "token uno": {
    "$value": "token value 1"
  },
  "token group": {
    "token dos": {
      "$value": "token value 2"
    },
    "nested token group": {
      "token tres": {
        "$value": "token value 3"
      },
      "Token cuatro": {
        "$value": "token value 4"
      }
    }
  }
}
```
