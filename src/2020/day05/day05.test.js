import { solvePart1, solvePart2 } from './day05.js' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

describe('2020 day 05', () => {
  const example = U.trim(`FBFBBFFRLR
  BFFFBBFRRR
  FFFBBBFRRR
  BBFFBBFRLL
  `)

  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1(example)).toEqual(820)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      expect(solvePart2(example)).toEqual(819)
    })
  })
})
