import { solvePart1, solvePart2 } from './day08.js' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

describe('2020 day 08', () => {
  const example = U.trim(`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`)

  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1(example)).toEqual(5)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      expect(solvePart2(example)).toEqual(8)
    })
  })
})
