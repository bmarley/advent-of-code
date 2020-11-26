import { solvePart1 } from './day17.js'
import { trim } from '../../utils.js'

describe('2018 day 17', () => {
  const example = trim(`
        x=495, y=2..7
        y=7, x=495..501
        x=501, y=3..7
        x=498, y=2..4
        x=506, y=1..2
        x=498, y=10..13
        x=504, y=10..13
        y=13, x=498..504
    `)

  describe('part 1', () => {
    test('solves an example', () => {
      const answer = solvePart1(example)
      expect(answer).toEqual(57)
    })
  })
})
