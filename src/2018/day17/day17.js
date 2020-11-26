import { Grid } from '../../utils.js'

const buildGrid = input => {
  const lines = input.split('\n')
  const grid = Grid(600, 1800, '.')

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  lines.forEach(l => {
    const [left, right] = l.split(', ')

    if (left.includes('x')) {
      const x = Number(left.substring(2))
      const yStart = Number(right.substring(2, right.indexOf('..')))
      const yEnd = Number(right.substring(right.indexOf('..') + 2))

      if (x > maxX) maxX = x
      if (x < minX) minX = x
      if (yStart < minY) minY = yStart
      if (yEnd > maxY) maxY = yEnd

      for (let i = yStart; i <= yEnd; i++) {
        grid[x][i] = '#'
      }
    } else {
      const y = Number(left.substring(2))
      const xStart = Number(right.substring(2, right.indexOf('..')))
      const xEnd = Number(right.substring(right.indexOf('..') + 2))

      if (y > maxY) maxY = y
      if (y < minY) minY = y
      if (xStart < minX) minX = xStart
      if (xEnd > maxX) maxX = xEnd

      for (let i = xStart; i <= xEnd; i++) {
        grid[i][y] = '#'
      }
    }
  })

  // const _print = grid.toString
  // grid.print = () => _print(0, minX - 3, 0, maxX + 4, maxY + 4)
  grid.bounds = { minX, minY, maxX: maxX + 1, maxY: maxY + 1 }

  return grid
}

const getBounds = (grid, x, y) => {
  let left = null
  let right = null

  for (let j = x; j >= grid.bounds.minX; j--) {
    if (grid[j][y] === '#') {
      left = j
      break
    }

    if (grid[j][y + 1] === '.') {
      break
    }
  }

  for (let j = x; j <= grid.bounds.maxX; j++) {
    if (grid[j][y] === '#') {
      right = j
      break
    }

    if (grid[j][y + 1] === '.') {
      break
    }
  }

  return { left, right }
}

const flow = (grid, x, y) => {
  if (y >= grid.bounds.maxY - 1) {
    return
  }

  if (grid[x][y + 1] === '.') {
    grid[x][y + 1] = '|'
    flow(grid, x, y + 1)
  }

  if ((grid[x][y + 1] === '#' || grid[x][y + 1] === '~') && grid[x - 1][y] === '.') {
    grid[x - 1][y] = '|'
    flow(grid, x - 1, y)
  }

  if ((grid[x][y + 1] === '#' || grid[x][y + 1] === '~') && grid[x + 1][y] === '.') {
    grid[x + 1][y] = '|'
    flow(grid, x + 1, y)
  }

  const bounds = getBounds(grid, x, y)
  if ((grid[x][y + 1] === '#' || grid[x][y + 1] === '~') && bounds.left && bounds.right) {
    for (let j = bounds.left + 1; j < bounds.right; j++) {
      grid[j][y] = '~'
    }
  }
}

export const solvePart1 = input => {
  const grid = buildGrid(input)
  const { minX, maxX, maxY } = grid.bounds

  flow(grid, 500, 0)

  let count = 0

  for (let y = grid.bounds.minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (grid[x][y] === '|' || grid[x][y] === '~') {
        count++
      }
    }
  }

  // grid.print()

  return count
}

export const solvePart2 = input => {
  const grid = buildGrid(input)
  const { minX, maxX, maxY } = grid.bounds

  flow(grid, 500, 0)

  let count = 0

  for (let y = grid.bounds.minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (grid[x][y] === '~') {
        count++
      }
    }
  }

  return count
}
