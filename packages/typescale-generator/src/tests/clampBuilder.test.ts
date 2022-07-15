import { clampBuilder } from "../utils/scales/clampBuilder"


  test('Generate clamped sizes for css', () => {
    const clamped = clampBuilder(320,1440,14.05,17.57)
    expect(clamped).toMatchSnapshot()
  })
 