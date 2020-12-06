import _ from 'lodash'
import { cycle, linesToNumbers } from '../../utils.js'

const { sum } = _

const addIfMissing = (set, val) => (set.has(val) ? false : Boolean(set.add(val)))

export const solvePart1 = input => {
  return sum(linesToNumbers(input))
}

export const solvePart2 = input => {
  const changes = linesToNumbers(input)
  const seen = new Set()
  let freq = 0

  for (const change of cycle(changes)) {
    freq += change
    if (!addIfMissing(seen, freq)) {
      return freq
    }
  }
}
