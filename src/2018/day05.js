import { minBy } from 'lodash'

const factorPolymer = input => {
    let done = false

    while (!done) {
        done = true
        for (let i = 0; i < input.length - 1; i++) {
            const asciiPairDiff = Math.abs(input[i].charCodeAt() - input[i + 1].charCodeAt())
            if (asciiPairDiff === 32) {
                input = `${input.slice(0, i)}${input.slice(i + 2)}`
                done = false
                break
            }
        }
    }

    return input
}
export const solvePart1 = input => {
    return factorPolymer(input).length
}

export const solvePart2 = input => {
    input = factorPolymer(input) // A first factorization pass speeds up the following passes

    const polymers = Array(26) // Indexes 0-26 represent 65-91 ASCII codes
        .fill()
        .map((e, i) => {
            const re = new RegExp(`${String.fromCharCode(i + 65)}`, 'gi')
            const strippedInput = input.replace(re, '')
            return factorPolymer(strippedInput)
        })

    return minBy(polymers, 'length').length
}
