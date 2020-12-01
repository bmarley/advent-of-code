import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

export function solvePart1(input) {
  input = U.linesToNumbers(input)
  for (let i = 0; i < input.length; i++) {
    for (let k = 0; k < input.length; k++) {
      if (input[i] + input[k] === 2020) {
        return input[i] * input[k]
      }
    }
  }
}

export function solvePart2(input) {
  input = U.linesToNumbers(input)
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      for (let k = 0; k < input.length; k++) {
        if (input[i] + input[k] + input[j] === 2020) {
          return input[i] * input[k] * input[j]
        }
      }
    }
  }
}
