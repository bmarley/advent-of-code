import { solvePart1, solvePart2 } from './day15.js'
import { trim } from '../../utils.js'

describe('2018 day 15', () => {
  describe('part 1', () => {
    test('solves example 1', () => {
      const example = trim(`
                #######
                #.G...#
                #...EG#
                #.#.#G#
                #..G#E#
                #.....#
                #######
            `)
      const answer = solvePart1(example)
      expect(answer).toEqual(27730)
    })

    test('solves example 2', () => {
      const example = trim(`
                #######
                #G..#E#
                #E#E.E#
                #G.##.#
                #...#E#
                #...E.#
                #######
            `)
      const answer = solvePart1(example)
      expect(answer).toEqual(36334)
    })

    test('solves example 3', () => {
      const example = trim(`
                #######
                #E..EG#
                #.#G.E#
                #E.##E#
                #G..#.#
                #..E#.#
                #######
            `)
      const answer = solvePart1(example)
      expect(answer).toEqual(39514)
    })

    test('solves example 4', () => {
      const example = trim(`
                #######
                #E.G#.#
                #.#G..#
                #G.#.G#
                #G..#.#
                #...E.#
                #######
            `)
      const answer = solvePart1(example)
      expect(answer).toEqual(27755)
    })

    test('solves example 5', () => {
      const example = trim(`
                #######
                #.E...#
                #.#..G#
                #.###.#
                #E#G#G#
                #...#G#
                #######
            `)
      const answer = solvePart1(example)
      expect(answer).toEqual(28944)
    })

    test('solves example 6', () => {
      const example = trim(`
                #########
                #G......#
                #.E.#...#
                #..##..G#
                #...##..#
                #...#...#
                #.G...G.#
                #.....G.#
                #########
            `)
      const answer = solvePart1(example)
      expect(answer).toEqual(18740)
    })
  })

  describe('part 2', () => {
    test('solves example 1', () => {
      const example = trim(`
                #######
                #.G...#
                #...EG#
                #.#.#G#
                #..G#E#
                #.....#
                #######
            `)
      const answer = solvePart2(example)
      expect(answer).toEqual(4988)
    })

    test('solves example 2', () => {
      const example = trim(`
                #########
                #G......#
                #.E.#...#
                #..##..G#
                #...##..#
                #...#...#
                #.G...G.#
                #.....G.#
                #########
            `)
      const answer = solvePart2(example)
      expect(answer).toEqual(1140)
    })
  })
})
