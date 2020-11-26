import { solvePart1, solvePart2 } from './day14.js'

describe('2018 day 14', () => {
  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1('9')).toEqual('5158916779')
      expect(solvePart1('2018')).toEqual('5941429882')
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      expect(solvePart2('51589')).toEqual(9)
      expect(solvePart2('92510')).toEqual(18)
      expect(solvePart2('59414')).toEqual(2018)
    })
  })
})
