import { power, solvePart1, solvePart2 } from './day11.js'

describe('2018 day 11', () => {
    test('calculates power', () => {
        expect(power(8, 3, 5)).toEqual(4)
    })

    describe('part 1', () => {
        test('solves an example', () => {
            expect(solvePart1('18')).toEqual('33,45')
            expect(solvePart1('42')).toEqual('21,61')
        })
    })

    describe('part 2', () => {
        test('solves an example', () => {
            expect(solvePart2('18')).toEqual('90,269,16')
            expect(solvePart2('42')).toEqual('232,251,12')
        })
    })
})
