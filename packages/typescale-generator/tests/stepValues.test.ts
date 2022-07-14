import { TypographyScaleValues } from "../src/utils/scales";
import { stepValues } from "../src/utils/scales/stepValues";

describe("Generate a set of step values", () => {
  test("snapshot with just a min", () => {
    const value = stepValues({
      min: {
        fontSize: 16,
        width: 320,
        typeScale: TypographyScaleValues.MINOR_SECOND.value,
      },
      step: 1,
    });
    expect(value).toMatchSnapshot();
  });

  test("min values only", () => {
    const value = stepValues({
      min: {
        fontSize: 16,
        width: 320,
        typeScale: TypographyScaleValues.MINOR_SECOND.value,
      },
      step: 0,
    });

    expect(value.clamp).toBe("1rem");
    expect(value.min.fontSize).toBe(16);
    expect(value.min.width).toBe(320);
    expect(value.min.typeScale).toBe(1.067);
    expect(value.max).toBe(undefined);
  });

  test("min and max values", () => {
    const value = stepValues({
      min: {
        fontSize: 16,
        width: 320,
        typeScale: TypographyScaleValues.MINOR_SECOND.value,
      },
      max: {
        fontSize: 16,
        width: 1440,
        typeScale: TypographyScaleValues.MINOR_SECOND.value,
      },
      step: 0,
    });

    expect(value.clamp).toBe('clamp(1rem, 1rem + 0vw, 1rem)');
    expect(value.min.fontSize).toBe(16);
    expect(value.min.width).toBe(320);
    expect(value.min.typeScale).toBe(1.067);
    expect(value.max).not.toBe(undefined);
    if (value.max) {
      expect(value.max.fontSize).toBe(16);
      expect(value.max.width).toBe(1440);
      expect(value.max.typeScale).toBe(1.067);
    }
  });
});
