import { solvePart1, solvePart2 } from './day09.js' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

describe('2020 day 09', () => {
  const example = U.trim(`35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`)

  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1(example, 5)).toEqual(127)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      expect(solvePart2(example, 127)).toEqual(62)
    })
  })
})
