import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

const PassValues = {
  BIRTH_YEAR: {
    id: 'byr',
    validate: (data) =>  data >= 1920 && data <= 2002
  },
  ISSUE_YEAR: {
    id: 'iyr',
    validate: (data) => data >= 2010 && data <= 2020
  },
  EXPR_YEAR: {
    id: 'eyr',
    validate: (data) => data >= 2020 && data <= 2030
  },
  HEIGHT: {
    id: 'hgt',
    validate: (data) => {
      let hgt;

      if ( data.includes('cm') ) {
        hgt = data.replace('cm', '')
        return hgt >= 150 && hgt <= 193
      } 

      if ( data.includes('in') ) {
        hgt = data.replace('in', '')
        return hgt >= 59 && hgt <= 76
      }

      return false;
    }
  },
  HAIR_COLOR: {
    id: 'hcl',
    validate: (data) => /^#[0-9a-f]{6}$/.test(data)
  },
  EYE_COLOR: {
    id: 'ecl',
    validate: (data) => ['amb', 'blu', 'grn', 'gry', 'brn', 'hzl', 'oth'].includes(data) 
  },
  PASSPORT_ID: {
    id: 'pid',
    validate: (data) => /^[0-9]{9}$/.test(data)
  }
}

const checkPassport = (passInfo, validate) => {
  const extractedInformation = _.map(PassValues, (value) => {
    const data = passInfo.match(`${value.id}:([^\\s]+)`)
    const validated = !!data && (!validate || (validate && value.validate(data[1])))
    return validated
  });
    
  return _.every(extractedInformation)
}

export function solvePart1(input) {
  var passports = input.split('\n\n').map(l => l.replace(/\n/g, ' '))
  return passports.filter(p => checkPassport(p, false)).length
}

export function solvePart2(input) {
  var passports = input.split('\n\n').map(l => l.replace(/\n/g, ' '))
  return passports.filter(p => checkPassport(p, true)).length
}
