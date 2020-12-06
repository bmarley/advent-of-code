import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

function binarySearch(input, lowerChar, upperChar) {
  return input.split('').reduce(
    ([min, max], char, idx) => {
      const mid = (min + max) / 2

      if (idx === input.length - 1) {
        return char === lowerChar ? min : max
      }

      if (char === lowerChar) max = Math.floor(mid)
      if (char === upperChar) min = Math.ceil(mid)

      return [min, max]
    },
    [0, Math.pow(2, input.length) - 1],
  )
}

export function solvePart1(input) {
  input = input.split('\n')

  return input.reduce((maxId, seat) => {
    const row = binarySearch(seat.substring(0, 7), 'F', 'B')
    const col = binarySearch(seat.substring(7), 'L', 'R')
    return Math.max(maxId, row * 8 + col)
  }, 0)
}

export function solvePart2(input) {
  input = input.split('\n')

  const ids = input
    .map(seat => {
      const row = binarySearch(seat.substring(0, 7), 'F', 'B')
      const col = binarySearch(seat.substring(7), 'L', 'R')
      return row * 8 + col
    })
    .sort((a, b) => a - b) // JS .sort() is lexicographical by default, lol

  for (let i = 0; i < ids.length; i++) {
    if (ids[i] !== ids[0] + i) {
      return ids[0] + i
    }
  }
}
