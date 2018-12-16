import { solvePart1, solvePart2 } from './day13.js'

describe('2018 day 13', () => {
    describe('part 1', () => {
        test('solves an example', () => {
            const example = [
                '/->-\\        ',
                '|   |  /----\\',
                '| /-+--+-\\  |',
                '| | |  | v  |',
                '\\-+-/  \\-+--/',
                '  \\------/   ',
            ].join('\n')

            const answer = solvePart1(example)
            expect(answer).toEqual('7,3')
        })
    })

    describe('part 2', () => {
        test('solves an example', () => {
            const example = [
                '/>-<\\  ',
                '|   |  ',
                '| /<+-\\',
                '| | | v',
                '\\>+</ |',
                '  |   ^',
                '  \\<->/',
            ].join('\n')

            const answer = solvePart2(example)
            expect(answer).toEqual('6,4')
        })
    })
})
