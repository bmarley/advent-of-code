import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

export const CLIPBOARD = () => false

function isValid(p) {
  if (!p) return false

  if (p.byr < 1920 || p.byr > 2002) return false
  if (p.iyr < 2010 || p.iyr > 2020) return false
  if (p.eyr < 2020 || p.eyr > 2030) return false

  let [match, hgt, unit] = /(\d+)(cm|in)/.exec(p.hgt) || []
  if (
    !match ||
    (unit == 'cm' && (hgt < 150 || hgt > 193)) ||
    (unit == 'in' && (hgt < 59 || hgt > 76))
  ) {
    return false
  }

  if (!/^#[0-9a-f]{6}$/.test(p.hcl)) return false
  if (!/(amb|blu|brn|gry|grn|hzl|oth)/.test(p.ecl)) return false
  if (!/^\d{9}$/.test(p.pid)) return false

  return true
}

function Passport(line) {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

  const passport = line.split(' ').reduce((acc, field) => {
    const [key, value] = field.split(':')

    const idx = requiredFields.indexOf(key)
    if (idx > -1) requiredFields.splice(idx, 1)

    acc[key] = value
    return acc
  }, {})

  if (requiredFields.length) return null
  return passport
}

export function solvePart1(input) {
  input = input.split('\n\n').map(l => l.replace(/\n/g, ' '))
  return input.filter(Passport).length
}

export function solvePart2(input) {
  input = input.split('\n\n').map(l => l.replace(/\n/g, ' '))
  return input.map(Passport).filter(isValid).length
}
