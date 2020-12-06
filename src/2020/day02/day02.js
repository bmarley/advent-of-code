import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

export function solvePart1(input) {
  return input.split('\n').filter(line => {
    let [, min, max, letter, str] = /(\d+)-(\d+) (.): (.*)/.exec(line)
    min = Number(min)
    max = Number(max)

    const count = str.split('').filter(c => c === letter).length
    return count >= min && count <= max
  }).length
}

export function solvePart2(input) {
  return input.split('\n').filter(line => {
    let [, min, max, letter, str] = /(\d+)-(\d+) (.): (.*)/.exec(line)
    min = Number(min)
    max = Number(max)

    return U.xor(str[min - 1] === letter, str[max - 1] === letter)
  }).length
}
