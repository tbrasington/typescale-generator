import { generateNamedScales, NamedScales } from '../src/utils/scales';
import { clampBuilder } from '../src/utils/scales/clampBuilder';
import {generateCSS} from '../src/utils/scales/generateCSS';
test('Generate a set of css variables', () => {

  const ScaleValues = generateNamedScales(NamedScales.MINOR_SECOND).typeScale
  
  const css = generateCSS({scales:ScaleValues})

  expect(css).toMatchSnapshot()
})
