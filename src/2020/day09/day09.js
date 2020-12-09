import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

export function solvePart1(input, preambleSize = 25) {
  const numbers = input.split('\n').map(n => Number(n))
  const preamble = numbers.slice(0, preambleSize)
  const rest = numbers.slice(preambleSize, numbers.length)

  for(let x = 0; x < rest.length; x++) {
    const sum = rest[x]
    let found = false;


    preamble: for (let y = 0; y < preamble.length; y++) {
      for (let z = y+1; z < preamble.length; z++) {
        found = found || preamble[y] + preamble[z] === sum
        if (found) break preamble;
      }
    }

    if (!found) return sum

    preamble.shift()
    preamble.push(sum)
  }
}

export function solvePart2(input, numToFind = 258585477) {
  const numbers = input.split('\n').map(n => Number(n))
  let runningSum = 0;
  for(let start = 0; start < numbers.length; start++) {
      runningSum = numbers[start]

    for (let end = start + 1; end < numbers.length; end++) {
      runningSum += numbers[end]

      if (runningSum === numToFind && end-start > 2) {
        let arr = numbers.slice(start, end+1).sort((a,b) => a-b)
        return arr[0] + arr[arr.length-1]
      }

      if (runningSum > numToFind) {
        break
      }
    }
  }
}
