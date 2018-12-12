import { range } from 'lodash'
import { Array2d } from 'src/utils.js'

// Buffer by 1 so we don't have to boundary check in our sum table
// (also convenient that puzzle size top left is (1, 1))
const SIZE = 301

export const power = (serial, x, y) => {
    const rackId = x + 10
    const power = (rackId * y + serial) * rackId
    return (Math.floor(power / 100) % 10) - 5
}

const buildSumTable = serial => {
    const sumTable = Array2d(SIZE, SIZE, 0)

    range(1, SIZE).forEach(x => {
        range(1, SIZE).forEach(y => {
            const up = sumTable[x][y - 1]
            const left = sumTable[x - 1][y]
            const upleft = sumTable[x - 1][y - 1]
            sumTable[x][y] = up + left - upleft + power(serial, x, y)
        })
    })

    return sumTable
}

const findMaxSum = (sumTable, windowSize) => {
    let max = 0
    let maxX = 0
    let maxY = 0

    range(1, SIZE - windowSize).forEach(x => {
        range(1, SIZE - windowSize).forEach(y => {
            const tl = sumTable[x - 1][y - 1]
            const tr = sumTable[x + windowSize - 1][y - 1]
            const bl = sumTable[x - 1][y + windowSize - 1]
            const br = sumTable[x + windowSize - 1][y + windowSize - 1]
            const sum = tl + br - bl - tr

            if (sum > max) {
                max = sum
                maxX = x
                maxY = y
            }
        })
    })

    return { max, maxX, maxY }
}

export const solvePart1 = input => {
    const serial = Number(input)
    const sumTable = buildSumTable(serial)

    const max = findMaxSum(sumTable, 3)
    return `${max.maxX},${max.maxY}`
}

export const solvePart2 = input => {
    const serial = Number(input)
    const sumTable = buildSumTable(serial)

    let maxSum = { max: 0, maxX: 0, maxY: 0 }
    let maxSize = 0

    range(1, SIZE).forEach(windowSize => {
        const m = findMaxSum(sumTable, windowSize)
        if (m.max > maxSum.max) {
            maxSum = m
            maxSize = windowSize
        }
    })

    return `${maxSum.maxX},${maxSum.maxY},${maxSize}`
}
