import wu from 'wu'

const numbers = input => input.split('\n').map(Number)
const sum = arr => arr.reduce((acc, num) => acc + num, 0)
const addIfMissing = (set, val) => set.has(val) ? false : Boolean(set.add(val))

export const solvePart1 = input => {
    return sum(numbers(input))
}

export const solvePart2 = input => {
    const seen = new Set()
    let s = 0

    wu.cycle(numbers(input))
        .takeWhile(_ => addIfMissing(seen, s))
        .forEach(n => s += n)

    return s
}
