import { solvePart1, solvePart2 } from './day02.js' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

describe('2020 day 02', () => {
  const example = U.trim(`
    1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc
  `)

  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1(example)).toEqual(2)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      expect(solvePart2(example)).toEqual(1)
    })
  })
})
