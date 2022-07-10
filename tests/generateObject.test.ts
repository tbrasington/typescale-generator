import { generateNamedScales, NamedScales } from '../src/utils/scales';
 import {generateObject} from '../src/utils/scales/generateObject';
test('Generate a set of css variables', () => {

  const ScaleValues = generateNamedScales(NamedScales.MINOR_SECOND).typeScale
  
  const jsObject = generateObject({scales:ScaleValues})

  expect(jsObject).toMatchSnapshot()
})
