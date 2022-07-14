import { generateRange } from "../src/utils/scales/generateRange";

describe("ranges", () => {
  test("Generate ranges for scales with a negative number", () => {
    const steps = generateRange({
      min: -2,
      max: 5,
    });
    expect(steps[0]).toBe(-2);
    expect(steps[steps.length-1]).toBe(5);
    expect(steps.length).toBe(8);
  });
  test("Generate ranges for scales with a 0 number", () => {
    const steps = generateRange({
      min: 0,
      max: 5,
    });
    expect(steps[0]).toBe(0);
    expect(steps[steps.length-1]).toBe(5);
    expect(steps.length).toBe(6);
  });
});
