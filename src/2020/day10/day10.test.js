import { solvePart1, solvePart2 } from './day10.js' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

describe('2020 day 10', () => {
  const example = U.trim(`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`)

  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1(example)).toEqual(220)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      expect(solvePart2(example)).toEqual(19208)
    })
  })
})
