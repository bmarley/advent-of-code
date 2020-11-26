import { solvePart1, solvePart2 } from './day01.js' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

describe('2019 day 01', () => {
  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1(`12`)).toEqual(2)
      expect(solvePart1(`14`)).toEqual(2)
      expect(solvePart1(`12\n14`)).toEqual(4)
      expect(solvePart1(`1969`)).toEqual(654)
      expect(solvePart1(`100756`)).toEqual(33583)
    })
  })

  describe('part 2', () => {
    test.only('solves an example', () => {
      expect(solvePart2(`1969`)).toEqual(966)
    })
  })
})
