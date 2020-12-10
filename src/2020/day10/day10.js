import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

export function solvePart1(input) {
  const numbers = input.split('\n').map(n => Number(n))
  const ordered = numbers.sort((a,b) => a-b)

  const diffMap = {
    1: 0,
    2: 0,
    3: 1
  }

  for (let n = 0; n < ordered.length; n++) {
    const diff = ordered[n] - (ordered[n-1] || 0);
    diffMap[diff]++
  }

  return diffMap[1] * diffMap[3];
}

const sumLeafNodes = (node, knownLeafCount = {}) => {
  if (_.isEmpty(node.children)) {
    return 1
  }

  let childCounts = _.map(node.children, (c) => knownLeafCount[c.value] || sumLeafNodes(c, knownLeafCount))

  knownLeafCount[node.value] = _.sum(childCounts)

  return knownLeafCount[node.value]
}

const buildTree = (numbers) => {
  const ordered = numbers.sort((a,b) => b-a)

  const nodeMap = {
    0: { value: 0, children: [] },
  }

  for(let n = 0; n < ordered.length; n++) {

    const currJoltage = ordered[n]
    const additionalLeafNodes = currJoltage <= 3 ? [0] : []
    const possibleChildren = _.filter(ordered.slice(n+1, n+4), (nextJoltage) => currJoltage - nextJoltage <= 3)

    nodeMap[currJoltage] = {
      value: currJoltage,
      children: possibleChildren.concat(additionalLeafNodes)
    }
  }

  return {
    tree: _.forEach(nodeMap, node => {
      node.children = node.children.map(n => nodeMap[n])
    }),
    root: ordered[0]
  }
}

export function solvePart2(input) {
  const numbers = input.split('\n').map(n => Number(n))
  const {tree, root} = buildTree(numbers)
  return sumLeafNodes(tree[root])
}
