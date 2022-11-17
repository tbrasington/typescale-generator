import fontFamily from "./fontFamily";
import fontWeights from "./fontWeights";
// from "./fontWeight.body.json";
import lineHeights from "./lineHeights";
import {
  buildTypographyScales,
  TypographyScaleValues,
} from "@initiate-ui/typescale-generator";
const scaleSettings = buildTypographyScales({
  range: [-1, 0, 2, 3, 4, 5, 6],
  sizes: [{
    width: 320,
    fontSize: 16,
    typeScale: TypographyScaleValues.MINOR_SECOND.value,
  },
   {
    width: 1440,
    fontSize: 20,
    typeScale: TypographyScaleValues.PERFECT_FOURTH.value,
  }],
});

const styles = {
  heading1: {
    $type: "typography",
    $value: {
      fontFamily: fontFamily.heading.$value,
      fontWeight: fontWeights.heading.normal.$value,
      letterSpacing: "10px",
      lineHeight: lineHeights.headings.$value,
      fontSize: scaleSettings.typeScale["step-6"].sizes[0].fontSize,
      fontStyle: "normal",
      fontSizes: [
        {
          $name: "320",
          $value: scaleSettings.typeScale["step-6"].sizes[0].fontSize,
        },
        {
          $name: "1440",
          $value: scaleSettings.typeScale["step-6"].sizes[1]?.fontSize,
        },
      ],
    },
  },
  heading2: {
    $type: "typography",
    $value: {
      fontFamily: fontFamily.heading.$value,
      fontWeight: fontWeights.heading.normal.$value,
      letterSpacing: "10",
      lineHeight: lineHeights.headings.$value,
      fontSize: scaleSettings.typeScale["step-0"].sizes[0].fontSize,
      fontStyle: "normal",
      fontSizes: [
        {
          $name: "320",
          $value: scaleSettings.typeScale["step-0"].sizes[1].fontSize,
        },
        {
          $name: "1440",
          $value: scaleSettings.typeScale["step-0"].sizes[1]?.fontSize,
        },
      ],
    },
  }
};
export default { namespace: "util", styles, scaleSettings };
