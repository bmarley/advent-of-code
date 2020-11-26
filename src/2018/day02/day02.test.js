import { solvePart1, solvePart2 } from './day02.js'
import { trim } from '../../utils.js'

describe('2018 day 02', () => {
  describe('part 1', () => {
    test('solves an example', () => {
      const example = trim(`
                abcdef
                bababc
                abbcde
                abcccd
                aabcdd
                abcdee
                ababab
            `)

      const answer = solvePart1(example)
      expect(answer).toEqual(12)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      const example = trim(`
                abcde
                fghij
                klmno
                pqrst
                fguij
                axcye
                wvxyz
            `)

      const answer = solvePart2(example)
      expect(answer).toEqual('fgij')
    })
  })
})
