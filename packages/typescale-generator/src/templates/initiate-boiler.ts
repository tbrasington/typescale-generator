import { NamedScales, TypographyScaleValues } from "src/utils/interfaces";

const boiler = {
  name: 'initiate-boiler',
  description: 'Initiate boilerplate',
  tokens : {
    lineHeights : {
      heading : 1.2,
      body  : 1.5,
    },
    fontWeights : {
      bold : 700,
      normal : 400
    },
    letterSpacings : {
      normal : 0,
    },
    fonts: {
      $main : "Inter"
    },
    fontScales: {
      min : {
        scale : TypographyScaleValues[NamedScales.MAJOR_THIRD].value,
        width  : 320,
        $description : "Base font scale, mobile upwards"
      },
       max : {
        scale : TypographyScaleValues[NamedScales.MAJOR_THIRD].value,
        width  : 1440,
        $description : "Base font scale, mobile upwards"
      }
    }
  },
  compositeTokens : {
    textStyles: {
     "Heading 1": {
        "$type": "typography",
        "$value": {
          "fontFamily": "{fonts.main}",
          "fontScaleStep": 2,
          "fontWeight": "{fontWeights.bold}",
          "letterSpacing": "{letterSpacings.normal}",
          "lineHeight":  "{lineHeights.heading"
        }
      },
      "Article Body": {
        "$type": "typography",
        "$value": {
          "fontFamily": "{fonts.main}",
          "fontScaleStep": 1,
          "fontWeight": "{fontWeights.normal}",
          "letterSpacing": "{letterSpacings.normal}",
          "lineHeight":  "{lineHeights.body"
        }
      }
    }
  }
}

export default boiler


/* 
  be nice if 
  - it scanned all {vars} and typechecked them, and if they werent found, it would throw an error
  - generate a compliant design tokens file at the end in json format
*/