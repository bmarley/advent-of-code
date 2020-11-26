import _ from 'lodash'
import { linesToNumbers } from '../../utils.js'

const { sum } = _

const addIfMissing = (set, val) => (set.has(val) ? false : Boolean(set.add(val)))

export const solvePart1 = input => {
  return sum(linesToNumbers(input))
}

export const solvePart2 = input => {
  const changes = linesToNumbers(input)
  const seen = new Set()
  let idx = 0
  let freq = 0

  while (true) {
    freq += changes[idx]
    if (!addIfMissing(seen, freq)) {
      return freq
    }
    idx = (idx + 1) % changes.length
  }
}
