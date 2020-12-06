import { solvePart1, solvePart2 } from './day05.js' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

describe('2020 day 05', () => {
  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1('FBFBBFFRLR')).toEqual(357)
      expect(solvePart1('BFFFBBFRRR')).toEqual(567)
      expect(solvePart1('FFFBBBFRRR')).toEqual(119)
      expect(solvePart1('BBFFBBFRLL')).toEqual(820)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      // No test for part 2
      expect().toEqual()
    })
  })
})
