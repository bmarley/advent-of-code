import { times, sum } from 'lodash'

const parse = input => {
    const numChildren = input.shift()
    const numMetadata = input.shift()

    if (numChildren === 0) {
        return {
            metadata: input.splice(0, numMetadata),
        }
    }

    return {
        children: times(numChildren, () => parse(input)),
        metadata: input.splice(0, numMetadata),
    }
}

const metadataSum = node => {
    if (!node.children) return sum(node.metadata)
    return sum(node.metadata) + sum(node.children.map(metadataSum))
}

const value = node => {
    if (!node) return 0
    if (!node.children) return sum(node.metadata)
    return sum(node.metadata.map(m => value(node.children[m - 1])))
}

export const solvePart1 = input => {
    const rootNode = parse(input.split(' ').map(Number))
    return metadataSum(rootNode)
}

export const solvePart2 = input => {
    const rootNode = parse(input.split(' ').map(Number))
    return value(rootNode)
}
