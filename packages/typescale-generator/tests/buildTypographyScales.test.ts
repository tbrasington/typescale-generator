import {buildTypographyScales } from '../src/utils/scales/buildTypographyScales';
import {TypographyScaleValues} from '../src/utils/scales'
test('Builds the typographic scale', () => {

  const scale = buildTypographyScales({
    range : [-1,0,2],
    min : {
      width : 320,
      fontSize : 16,
      typeScale : TypographyScaleValues.MINOR_SECOND.value,
    },
    max : {
      width : 1440,
      fontSize : 20,
      typeScale : TypographyScaleValues.PERFECT_FOURTH.value,
    },
  })
  expect(scale).toMatchSnapshot()
})