import { solvePart1, solvePart2 } from './day16.js'

describe('2018 day 16', () => {
    const example = `Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]



123
456`

    describe('part 1', () => {
        test('solves an example', () => {
            const answer = solvePart1(example)
            expect(answer).toEqual(1)
        })
    })

    describe('part 2', () => {
        test('solves an example', () => {
            const answer = solvePart2(example)
            expect(answer).toEqual()
        })
    })
})
