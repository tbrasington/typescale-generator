import { NamedScales, TypographyScaleValues } from '../utils/interfaces';
import { buildTypographyScales,  } from '../utils/scales';
 import {generateObject} from '../utils/scales/generateObject';
import { generateRange } from '../utils/scales/generateRange';
test('Generate a set of css variables', () => {

  const config = {
    min: {
      width: 320,
      fontSize: 16,
      typeScale: TypographyScaleValues.MINOR_SECOND.value,
    },
    max: {
      width: 1440,
      fontSize: 20,
      typeScale: TypographyScaleValues.MINOR_SECOND.value
    },
  };
  const range = generateRange({min: -2, max: 5});
  const ScaleValues = buildTypographyScales({...config,range}).typeScale
  
  const jsObject = generateObject({scales:ScaleValues})

  expect(jsObject).toMatchSnapshot()
})
