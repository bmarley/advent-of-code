import { hasVal } from 'src/utils.js'

const letterCounts = line => {
    return line.split('').reduce((acc, char) => {
        if (!acc[char]) acc[char] = 0
        acc[char]++
        return acc
    }, {})
}

const getDistance = (a, b) => {
    let distance = 0

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            distance++
        }
    }

    return distance
}

const getCommonLetters = (a, b) => {
    let s = ''

    for (let i = 0; i < a.length; i++) {
        if (a[i] === b[i]) {
            s += a[i]
        }
    }

    return s
}

export const solvePart1 = input => {
    const lines = input.split('\n')

    const { hasTwo, hasThree } = lines.reduce((acc, line) => {
        const counts = letterCounts(line)

        if (hasVal(counts, 2)) acc.hasTwo++
        if (hasVal(counts, 3)) acc.hasThree++

        return acc
    }, { hasTwo: 0, hasThree: 0 })

    return hasTwo * hasThree
}

export const solvePart2 = input => {
    const lines = input.split('\n')

    for (let i = 0; i < lines.length - 1; i++) {
        for (let k = i + 1; k < lines.length; k++) {
            const distance = getDistance(lines[i], lines[k])
            if (distance === 1) {
                return getCommonLetters(lines[i], lines[k])
            }
        }
    }

    throw Error('Not found')
}
