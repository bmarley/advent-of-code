import { solvePart1, solvePart2 } from './day04.js' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

describe('2020 day 04', () => {
  const example = `eyr:1972 cid:100
  hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

  iyr:2019
  hcl:#602927 eyr:1967 hgt:170cm
  ecl:grn pid:012533040 byr:1946

  hcl:dab227 iyr:2012
  ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

  hgt:59cm ecl:zzz
  eyr:2038 hcl:74454a iyr:2023
  pid:3556412378 byr:2007
  `;

  describe('part 1', () => {
    test('solves an example', () => {
      expect(solvePart1(example)).toEqual(4)
    })
  })

  describe('part 2', () => {
    test('solves an example', () => {
      expect(solvePart2(example)).toEqual(0)
    })
  })
})
