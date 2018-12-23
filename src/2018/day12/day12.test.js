import { solvePart1 } from './day12.js'
import { trim } from 'src/utils.js'

describe('2018 day 12', () => {
    const example = trim(`
        initial state: #..#.#..##......###...###

        ...## => #
        ..#.. => #
        .#... => #
        #.#.# => .
        .#.#. => #
        .#.## => #
        .##.. => #
        .#### => #
        #.#.# => #
        #.### => #
        ##.#. => #
        ##.## => #
        ###.. => #
        ###.# => #
        ####. => #
    `)

    // 0: ...#..#.#..##......###...###...........
    // 1: ...#...#....#.....#..#..#..#...........
    // 2: ...##..##...##....#..#..#..##..........

    describe('part 1', () => {
        test('solves an example', () => {
            const answer = solvePart1(example)
            expect(answer).toEqual(325)
        })
    })
})
