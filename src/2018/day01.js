import wu from 'wu'
import { sum } from 'lodash'
import { linesToNumbers } from 'src/utils.js'

const addIfMissing = (set, val) => (set.has(val) ? false : Boolean(set.add(val)))

export const solvePart1 = input => {
    return sum(linesToNumbers(input))
}

export const solvePart2 = input => {
    const seen = new Set()
    let s = 0

    wu.cycle(linesToNumbers(input))
        .takeWhile(_ => addIfMissing(seen, s))
        .forEach(n => (s += n))

    return s
}
