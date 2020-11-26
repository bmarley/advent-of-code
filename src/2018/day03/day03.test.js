import { solvePart1, solvePart2 } from './day03.js'
import { trim } from '../../utils.js'

describe('2018 day 03', () => {
  describe('part 1', () => {
    test('solves an example', () => {
      const example = trim(`
                #1 @ 1,3: 4x4
                #2 @ 3,1: 4x4
                #3 @ 5,5: 2x2
            `)

      const answer = solvePart1(example)
      expect(answer).toEqual(4)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      const example = trim(`
                #1 @ 1,3: 4x4
                #2 @ 3,1: 4x4
                #3 @ 5,5: 2x2
            `)

      const answer = solvePart2(example)
      expect(answer).toEqual('3')
    })
  })
})
