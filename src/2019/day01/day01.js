import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

function getFuel(input) {
  return Math.floor(input / 3) - 2
}

function recursiveGetFuel(input) {
  let fuel = 0

  while (input > 0) {
    const newFuel = getFuel(input)
    if (newFuel > 0) {
      fuel += newFuel
    }
    input = newFuel
  }

  return fuel
}

export function solvePart1(input) {
  return U.linesToNumbers(input).reduce((acc, num) => {
    return acc + getFuel(num)
  }, 0)
}

export function solvePart2(input) {
  return U.linesToNumbers(input).reduce((acc, num) => {
    return acc + recursiveGetFuel(num)
  }, 0)
}
