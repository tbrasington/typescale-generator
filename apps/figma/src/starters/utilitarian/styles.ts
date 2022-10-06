import fontFamily from "./fontFamily";
import fontWeights from "./fontWeights";
// from "./fontWeight.body.json";
import lineHeights from "./lineHeights";
import {
  buildTypographyScales,
  TypographyScaleValues,
} from "@initiate-ui/typescale-generator";
const scaleSettings = buildTypographyScales({
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

const styles = {
  heading1: {
    $type: "typography",
    $value: {
      fontFamily: fontFamily.heading.$value,
      fontWeight: fontWeights.heading.normal.$value,
      letterSpacing: "0px",
      lineHeight: lineHeights.headings.$value,
      fontSize: scaleSettings.typeScale["step-0"].min.fontSize,
      fontSizes: [
        {
          $name: "320",
          $value: scaleSettings.typeScale["step-0"].min.fontSize,
        },
        {
          $name: "1440",
          $value: scaleSettings.typeScale["step-0"].max?.fontSize,
        },
      ],
    },
  },
};
export default { styles, scaleSettings };
