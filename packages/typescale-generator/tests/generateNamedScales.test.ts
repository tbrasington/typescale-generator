import { generateNamedScales, NamedScales } from "../src/utils/scales"
import { generateRange } from "../src/utils/scales/generateRange";

test('Generate typography scales', () => {
  const range = generateRange({min: -2, max: 5});
  const typeScales = generateNamedScales(NamedScales["MINOR_SECOND"],range)
  expect(typeScales).toMatchSnapshot()
})