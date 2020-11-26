import _ from 'lodash'
import { extractNumbers } from '../../utils.js'

const { range, maxBy, max, min, sum } = _

const distance = ([x1, y1], [x2, y2]) => Math.abs(x2 - x1) + Math.abs(y2 - y1)

export const solvePart1 = input => {
  const points = input.split('\n').map(l => extractNumbers(l))
  const upperBound = max(maxBy(points, pair => max(pair))) + 1

  const closestPoint = Array(upperBound)
    .fill()
    .map((e, i) => Array(upperBound))

  range(0, upperBound).forEach(x => {
    range(0, upperBound).forEach(y => {
      const distances = points.map(pair => distance(pair, [x, y]))
      const shortest = min(distances)

      if (distances.filter(d => d === shortest).length === 1) {
        closestPoint[x][y] = distances.indexOf(shortest)
      }
    })
  })

  const toIgnore = new Set()
  range(0, upperBound).forEach(n => {
    toIgnore.add(closestPoint[0][n])
    toIgnore.add(closestPoint[n][0])
    toIgnore.add(closestPoint[closestPoint.length - 1][n])
    toIgnore.add(closestPoint[n][closestPoint.length - 1])
  })

  const regionSizes = Array(points.length).fill(0)
  range(0, upperBound).forEach(x => {
    range(0, upperBound).forEach(y => {
      const point = closestPoint[x][y]
      if (!toIgnore.has(point)) {
        regionSizes[point]++
      }
    })
  })

  return max(regionSizes)
}

export const solvePart2 = input => {
  const points = input.split('\n').map(l => extractNumbers(l))
  const upperBound = max(maxBy(points, pair => max(pair))) + 1

  let regionSize = 0
  range(0, upperBound).forEach(x => {
    range(0, upperBound).forEach(y => {
      const distances = points.map(pair => distance(pair, [x, y]))

      if (sum(distances) < (process.env.NODE_ENV === 'test' ? 32 : 10000)) {
        regionSize++
      }
    })
  })

  return regionSize
}
