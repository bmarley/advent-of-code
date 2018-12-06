import { min } from 'lodash'
import { extractNumbers } from 'src/utils.js'

const getReachable = (nodes, from) => {
    const reachable = new Set()
    let pending = [from]

    while (pending.length) {
        const siblings = nodes[pending.pop()]

        siblings.forEach(s => {
            if (reachable.has(s)) return
            reachable.add(s)
            pending.push(s)
        })
    }

    return [...reachable]
}

export const solvePart1 = input => {
    const nodes = input.split('\n').map(l => extractNumbers(l).slice(1))
    return getReachable(nodes, 0).length
}

export const solvePart2 = input => {
    const nodes = input.split('\n').map(l => extractNumbers(l).slice(1))

    const seen = new Set()

    nodes.forEach((siblings, idx) => {
        const reachable = getReachable(nodes, idx)
        seen.add(min(reachable))
    })

    return seen.size
}
