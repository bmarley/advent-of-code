import { solvePart1, solvePart2 } from './day13.js' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

describe('2020 day 13', () => {
  const example = U.trim(`939
7,13,x,x,59,x,31,19`)

  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1(example)).toEqual(295)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      expect(solvePart2(example)).toEqual(1068781)
    })
  })
})
