import { times, max, range, mapValues, sum } from 'lodash'
import { extractNumbers } from 'src/utils.js'

const getMaxScore = (players, lastMarble) => {
    const scores = range(players).reduce((acc, n) => ({ [n]: [], ...acc }), {})

    let player = 0

    let current = { value: 0 }
    current.prev = current
    current.next = current

    for (let marble = 1; marble <= lastMarble; marble++) {
        if (marble % 23 === 0) {
            times(7, () => {
                current = current.prev
            })

            scores[player].push(marble)
            scores[player].push(current.value)

            current.next.prev = current.prev
            current.prev.next = current.next
            current = current.next
        } else {
            const newMarble = { value: marble, prev: current.next, next: current.next.next }
            current.next.next.prev = newMarble
            current.next.next = newMarble
            current = newMarble
        }

        player = (player + 1) % players
    }

    return max(Object.values(mapValues(scores, sum)))
}

export const solvePart1 = input => {
    const [players, lastMarble] = extractNumbers(input)
    return getMaxScore(players, lastMarble)
}

export const solvePart2 = input => {
    const [players, lastMarble] = extractNumbers(input)
    return getMaxScore(players, lastMarble * 100)
}
