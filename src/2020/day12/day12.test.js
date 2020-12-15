import { solvePart1, solvePart2 } from './day12.js' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

describe('2020 day 12', () => {
  const example = U.trim(`F10
N3
F7
R90
F11`)

  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1(example)).toEqual(25)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      expect(solvePart2(example)).toEqual(286)
    })
  })
})
