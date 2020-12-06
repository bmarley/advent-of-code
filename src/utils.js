import _ from 'lodash'

// Returns Array<Number>
export function linesToNumbers(input) {
  return input.split('\n').map(Number)
}

// Returns Array<Number> of every number found in the line
export function extractNumbers(str) {
  return (str.match(/-?[0-9.,]+/g) || []).map(n => n.replace(/,/g, '')).map(Number)
}

// Returns true if given Object has some key with a value matching val
export function hasVal(obj, val) {
  return Object.values(obj).some(v => v === val)
}

// For trimming the example inputs in test files
export function trim(str) {
  return str
    .split('\n')
    .map(l => l.replace(/^\s*/, ''))
    .filter(l => l !== '')
    .join('\n')
}

// Manhattan distance between pairs of { x: Number, y: Number } objects
export function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

export function translate(str, from, to) {
  const lookups = from.split('').reduce((acc, char, idx) => {
    acc[char] = to[idx]
    return acc
  }, {})

  let answer = []
  for (let i = 0; i < str.length; i++) {
    answer[i] = lookups[str[i]] || str[i]
  }
  return answer.join('')
}

// Cycle array. Usage:
// for (const elem of cycle(arr)) {
//   console.log(elem)
// }
export function* cycle(arr) {
  let idx = 0
  while (true) {
    yield arr[idx]
    idx = (idx + 1) % arr.length
  }
}

export function xor(a, b) {
  return a ? !b : !!b
}

export function Grid(sizeX, sizeY, fill) {
  const grid = Array(sizeX)
    .fill()
    .map(() => {
      const arr = Array(sizeY)
      if (typeof fill !== 'undefined') {
        arr.fill(fill)
      }
      return arr
    })

  grid.print = function print({
    padSize = 0,
    minX = 0,
    minY = 0,
    maxX = sizeX,
    maxY = sizeY,
  } = {}) {
    let str = '\n'

    _.range(minY, maxY).forEach(y => {
      _.range(minX, maxX).forEach(x => {
        str += _.pad(grid[x][y], padSize)
      })
      str += '\n'
    })

    console.log(str)
  }

  return grid
}
