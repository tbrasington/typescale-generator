import { numberToRem } from "../utils/scales/numberToRem" 


test('Generate a rem', () => {
  const rem = numberToRem(16)
  expect(rem).toBe('1rem')  
})