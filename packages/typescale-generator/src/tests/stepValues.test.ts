import { TypographyScaleValues } from "../utils/interfaces";
import { stepValues } from "../utils/scales/stepValues";

describe("Generate a set of step values", () => {
  test("snapshot with just a min", () => {
    const value = stepValues({
     sizes: [{
      width: 320,
      fontSize: 16,
      typeScale: TypographyScaleValues.MINOR_SECOND.value,
    } ],
      step: 1,
    });
    expect(value).toMatchSnapshot();
  });

  test("min values only", () => {
    const value = stepValues({
     sizes: [{
      width: 320,
      fontSize: 16,
      typeScale: TypographyScaleValues.MINOR_SECOND.value,
    }],
      step: 0,
    });

    expect(value.clamp).toBe("1rem");
    expect(value.sizes[0].fontSize).toBe(16);
    expect(value.sizes[0].width).toBe(320);
    expect(value.sizes[0].typeScale).toBe(1.067);
    expect(value.sizes[1]).toBe(undefined);
  });

  test("min and max values", () => {
    const value = stepValues({
      sizes: [{
      width: 320,
      fontSize: 16,
      typeScale: TypographyScaleValues.MINOR_SECOND.value,
    },{
      width: 1440,
      fontSize: 16,
      typeScale: TypographyScaleValues.MINOR_SECOND.value
    }],
      step: 0,
    });
    expect(value.clamp).toBe('clamp(1rem, 1rem + 0vw, 1rem)');
    expect(value.sizes[0].fontSize).toBe(16);
    expect(value.sizes[0].width).toBe(320);
    expect(value.sizes[0].typeScale).toBe(1.067);
    expect(value.sizes[0]).not.toBe(undefined);
    if (value.sizes[1]) {
      expect(value.sizes[1].fontSize).toBe(16);
      expect(value.sizes[1].width).toBe(1440);
      expect(value.sizes[1].typeScale).toBe(1.067);
    }
  });
});
