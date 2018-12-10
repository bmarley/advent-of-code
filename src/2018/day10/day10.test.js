import fs from 'fs'
import { solvePart1 } from './day10.js'

describe('2018 day 10', () => {
    describe('part 1', () => {
        test('dry runs an example', () => {
            solvePart1(fs.readFileSync('src/2018/day10/day10-test', 'utf-8').trim())
        })
    })
})
