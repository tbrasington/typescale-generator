import { generateNamedScales, NamedScales } from "../src/utils/scales"

test('Generate typography scales', () => {
  const typeScales = generateNamedScales(NamedScales["MINOR_SECOND"])
  expect(typeScales).toMatchSnapshot()
})