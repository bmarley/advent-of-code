import _ from 'lodash'
import { Grid } from '../../utils.js'

const { times } = _

const SIZE = process.env.NODE_ENV === 'test' ? 10 : 50

const getGrid = input => {
  const grid = Grid(SIZE, SIZE, '.')

  input.split('\n').forEach((line, y) => {
    line.split('').forEach((cell, x) => {
      grid[x][y] = cell
    })
  })

  return grid
}

const getNeighbors = (grid, x, y) => {
  const neighbors = []

  for (let ny = Math.max(0, y - 1); ny <= Math.min(y + 1, SIZE - 1); ny++) {
    for (let nx = Math.max(0, x - 1); nx <= Math.min(x + 1, SIZE - 1); nx++) {
      if (!(nx === x && ny === y)) {
        neighbors.push({ x: nx, y: ny, val: grid[nx][ny] })
      }
    }
  }

  return neighbors
}

const numNeighbors = (grid, x, y, val) => {
  const neighbors = getNeighbors(grid, x, y)
  return neighbors.filter(n => n.val === val).length
}

const getNextGrid = grid => {
  const nextGrid = Grid(SIZE, SIZE, '')

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      if (grid[x][y] === '.') {
        if (numNeighbors(grid, x, y, '|') >= 3) {
          nextGrid[x][y] = '|'
        } else {
          nextGrid[x][y] = grid[x][y]
        }
      }

      if (grid[x][y] === '|') {
        if (numNeighbors(grid, x, y, '#') >= 3) {
          nextGrid[x][y] = '#'
        } else {
          nextGrid[x][y] = grid[x][y]
        }
      }

      if (grid[x][y] === '#') {
        if (numNeighbors(grid, x, y, '#') >= 1 && numNeighbors(grid, x, y, '|') >= 1) {
          nextGrid[x][y] = grid[x][y]
        } else {
          nextGrid[x][y] = '.'
        }
      }
    }
  }

  return nextGrid
}

const getResourceValue = grid => {
  let numTrees = 0
  let numYards = 0

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      if (grid[x][y] === '|') numTrees++
      if (grid[x][y] === '#') numYards++
    }
  }

  return numTrees * numYards
}

export const solvePart1 = input => {
  let grid = getGrid(input)

  times(10, () => {
    grid = getNextGrid(grid)
  })

  return getResourceValue(grid)
}

export const solvePart2 = input => {
  let grid = getGrid(input)

  times(450, () => {
    grid = getNextGrid(grid)
  })

  // Our pattern repeats every 28 iterations after 450. Skip the in between interations

  for (let i = 450 + Math.floor((1000000000 - 450) / 28) * 28; i < 1000000000; i++) {
    grid = getNextGrid(grid)
  }

  return getResourceValue(grid)
}
