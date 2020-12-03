import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

function countTrees(path, dx, dy) {
  let y = 0
  let x = 0
  let trees = 0

  while (y < path.length) {
    if (path[y][x] === '#') {
      trees++
    }

    x = (x + dx) % path[y].length
    y += dy
  }

  return trees
}

export function solvePart1(input) {
  input = input.split('\n')
  return countTrees(input, 3, 1)
}

export function solvePart2(input) {
  input = input.split('\n')

  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]

  return slopes.reduce((acc, s) => acc * countTrees(input, ...s), 1)
}
