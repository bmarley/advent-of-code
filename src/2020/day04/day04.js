import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

const PassValues = {
  BIRTH_YEAR: {
    id: 'byr',
    validate: (data) =>  Number(data) >= 1920 && Number(data) <= 2002
  },
  ISSUE_YEAR: {
    id: 'iyr',
    validate: (data) => Number(data) >= 2010 && Number(data) <= 2020
  },
  EXPR_YEAR: {
    id: 'eyr',
    validate: (data) => Number(data) >= 2020 && Number(data) <= 2030
  },
  HEIGHT: {
    id: 'hgt',
    validate: (data) => {
      let hgt;

      if ( data.includes('cm') ) {
        hgt = Number(data.replace('cm', ''))
        return hgt >= 150 && hgt <= 193
      } 

      if ( data.includes('in') ) {
        hgt = Number(data.replace('in', ''))
        return hgt >= 59 && hgt <= 76
      }

      return false;
    }
  },
  HAIR_COLOR: {
    id: 'hcl',
    validate: (data) => !!data.match('^#[0-9a-f]{6}$')
  },
  EYE_COLOR: {
    id: 'ecl',
    validate: (data) => ['amb', 'blu', 'grn', 'gry', 'brn', 'hzl', 'oth'].includes(data) 
  },
  PASSPORT_ID: {
    id: 'pid',
    validate: (data) => !!data.match('^[0-9]{9}$')
  }
}

const checkPassport = (passInfo, validate) => {
  const extractedInformation = _.map(PassValues, (value) => {
    const data = passInfo.match(`${value.id}:([^\\s]+)`)
    const validated = !!data && (!validate || (validate && value.validate(data[1])))
    return validated
  });
    
  return _.every(extractedInformation, (value) => !!value)
}

export function solvePart1(input) {
  var passports = input.split('\n\n').map(l => l.replace(/\n/g, ' '))
  return passports.map(p => checkPassport(p, false)).filter(p => p).length
}

export function solvePart2(input) {
  var passports = input.split('\n\n').map(l => l.replace(/\n/g, ' '))
  return passports.map(p => checkPassport(p, true)).filter(p => p).length
}
