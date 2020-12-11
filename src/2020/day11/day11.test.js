import { solvePart1, solvePart2 } from './day11.js' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

describe('2020 day 11', () => {
  const example = U.trim(`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`)

  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1(example)).toEqual(37)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      expect(solvePart2(example)).toEqual(26)
    })
  })
})
