import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

export function solvePart1(input) {
  let [startingTime, busList] = input.split('\n')
  let currTime = Number(startingTime)
  busList = busList.split(',').filter(b => b !== 'x').map(b => Number(b))

  while (true) {
    for (let ind = 0; ind < busList.length; ind++) {
      if (currTime % busList[ind] === 0) {
        return (currTime - startingTime) * busList[ind]
      }
    }
    currTime++;
  }

}

export function solvePart2(input) {
  let [, busList] = input.split('\n')
  busList = busList.split(',').map((b, index) => [index, Number(b) || b]).filter(b => b[1] !== 'x')

  const findFactors = (timestamp) => {
    return busList.map(bus => (timestamp + bus[0]) % bus[1] === 0)
  }

  let timestamp = 1
  let increment = 1
  let currentIndex = 1
  let period = 0
  let prevTimestamp = 0

  while (true) {
    let factors = findFactors(timestamp)
    let found = _.every(factors.slice(0, currentIndex))

    if (found) {
      if (timestamp - prevTimestamp === period) {
        increment = period
        currentIndex++
      } else {
        period = timestamp - prevTimestamp
      }
      prevTimestamp = timestamp
    }

    if (_.every(factors)) {
      return timestamp
    }

    timestamp += increment
  }
}
