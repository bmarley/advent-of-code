import { solvePart1 } from './day19.js'
import { trim } from 'src/utils.js'

describe('2018 day 19', () => {
    const example = trim(`
        #ip 0
        seti 5 0 1
        seti 6 0 2
        addi 0 1 0
        addr 1 2 3
        setr 1 0 0
        seti 8 0 4
        seti 9 0 5
    `)

    describe('part 1', () => {
        test.only('solves an example', () => {
            const answer = solvePart1(example)
            expect(answer).toEqual(6)
        })
    })
})
