import { buildTypographyScales } from "../utils/scales/buildTypographyScales";
import { TypographyScaleValues } from "../utils/interfaces";
   
  test("using the new range", () => {
    const scale = buildTypographyScales({
      range: [-1, 0, 2],
      sizes: [
        {
          $name : "BP1",
          width: 320,
          fontSize: 16,
          typeScale: TypographyScaleValues.MINOR_SECOND.value,
        },
        {
          $name : "BP2",
          width: 768,
          fontSize: 18,
          typeScale: TypographyScaleValues.PERFECT_FOURTH.value,
        },
        {
          $name : "BP3",
          width: 1440,
          fontSize: 20,
          typeScale: TypographyScaleValues.PERFECT_FOURTH.value,
        },
      ],
    });
    expect(scale).toMatchSnapshot();
  });
