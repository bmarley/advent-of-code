import { solvePart1, solvePart2 } from './day20.js' // eslint-disable-line

describe('2018 day 20', () => {
  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1('^WNE$')).toEqual(3)
      expect(solvePart1('^ENWWW(NEEE|SSE(EE|N))$')).toEqual(10)
      expect(solvePart1('^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$')).toEqual(18)
      expect(solvePart1('^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$')).toEqual(23)
      expect(
        solvePart1('^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$'),
      ).toEqual(31)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      // const answer = solvePart2(example)
      // expect(answer).toEqual()
    })
  })
})
