import { solvePart1, solvePart2 } from './day01.js' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

describe('2020 day 01', () => {
  const example = U.trim(`
    1721
    979
    366
    299
    675
    1456
  `)

  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1(example)).toEqual(514579)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      expect(solvePart2(example)).toEqual(241861950)
    })
  })
})
