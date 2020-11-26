import { solvePart1 } from './day18.js'
import { trim } from '../../utils.js'

describe('2018 day 18', () => {
  const example = trim(`
        .#.#...|#.
        .....#|##|
        .|..|...#.
        ..|#.....#
        #.#|||#|#|
        ...#.||...
        .|....|...
        ||...#|.#|
        |.||||..|.
        ...#.|..|.
    `)

  describe('part 1', () => {
    test('solves an example', () => {
      const answer = solvePart1(example)
      expect(answer).toEqual(1147)
    })
  })
})
