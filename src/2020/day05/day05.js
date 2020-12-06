import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

export function solvePart1(input) {
  input = input.split('\n')
  return _.max(input.map(seat => parseInt(U.translate(seat, 'FBLR', '0101'), 2)))
}

export function solvePart2(input) {
  input = input.split('\n')

  const ids = input
    .map(seat => parseInt(U.translate(seat, 'FBLR', '0101'), 2))
    // Array.sort() is lexicographical in JS, lol
    .sort((a, b) => a - b)

  for (let i = 0; i < ids.length; i++) {
    if (ids[i] !== ids[0] + i) {
      return ids[0] + i
    }
  }
}
