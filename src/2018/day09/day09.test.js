import { solvePart1 } from './day09.js'

describe('2018 day 09', () => {
    describe('part 1', () => {
        test('solves an example', () => {
            expect(solvePart1('9 players; last marble is worth 25 points')).toEqual(32)
            expect(solvePart1('10 players; last marble is worth 1618 points')).toEqual(8317)
            expect(solvePart1('13 players; last marble is worth 7999 points')).toEqual(146373)
            expect(solvePart1('17 players; last marble is worth 1104 points')).toEqual(2764)
            expect(solvePart1('21 players; last marble is worth 6111 points')).toEqual(54718)
            expect(solvePart1('30 players; last marble is worth 5807 points')).toEqual(37305)
        })
    })
})
