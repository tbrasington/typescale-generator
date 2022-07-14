import { generateNamedScales, NamedScales } from '../src/utils/scales';
 import {generateObject} from '../src/utils/scales/generateObject';
import { generateRange } from '../src/utils/scales/generateRange';
test('Generate a set of css variables', () => {

  const range = generateRange({min: -2, max: 5});
  const ScaleValues = generateNamedScales(NamedScales.MINOR_SECOND,range).typeScale
  
  const jsObject = generateObject({scales:ScaleValues})

  expect(jsObject).toMatchSnapshot()
})
