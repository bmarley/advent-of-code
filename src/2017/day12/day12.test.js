import { solvePart1, solvePart2 } from './day12.js'
import { trim } from '../../utils.js'

describe('2017 day 12', () => {
  const example = trim(`
        0 <-> 2
        1 <-> 1
        2 <-> 0, 3, 4
        3 <-> 2, 4
        4 <-> 2, 3, 6
        5 <-> 6
        6 <-> 4, 5
    `)

  describe('part 1', () => {
    test('solves an example', () => {
      const answer = solvePart1(example)
      expect(answer).toEqual(6)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      const answer = solvePart2(example)
      expect(answer).toEqual(2)
    })
  })
})
