const CART_SYMBOLS = ['v', '^', '>', '<']
const VERT = ['\\', '|', '/', '+']
const HORZ = ['\\', '-', '/', '+']
const LEFT = ['v', '>', '^', '<']
const RIGHT = ['v', '<', '^', '>']

const topLeftPrecedence = (a, b) => {
  if (a.y < b.y) {
    return -1
  } else if (a.y > b.y) {
    return 1
  }

  if (a.x < b.x) {
    return -1
  } else if (a.x > b.x) {
    return 1
  }

  return 0
}

// eslint-disable-next-line
const print = (lines, carts) => {
  const grid = lines.slice()
  carts.forEach(c => {
    if (c.dead) return
    grid[c.y] = grid[c.y].substring(0, c.x) + c.dir + grid[c.y].substring(c.x + 1)
  })
  console.log(grid.join('\n'))
}

const buildTrack = rawLines => {
  const carts = []
  const lines = rawLines.slice()

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const c = lines[y][x]

      if (CART_SYMBOLS.includes(c)) {
        carts.push({ dir: c, x, y, next: 'l' })

        const l = lines[y][x - 1]
        const r = lines[y][x + 1]
        const u = y === 0 ? undefined : lines[y - 1][x]
        const d = y === lines.length - 1 ? undefined : lines[y + 1][x]

        let track
        if (l === '-' && r === '-' && u === '|' && d === '|') {
          track = '+'
        } else if (HORZ.includes(l) && HORZ.includes(r)) {
          track = '-'
        } else if (VERT.includes(u) && VERT.includes(d)) {
          track = '|'
        } else if (l === '-' && d === '|') {
          track = '\\'
        } else if (r === '-' && d === '|') {
          track = '/'
        } else if (l === '-' && u === '|') {
          track = '/'
        } else if (r === '-' && u === '|') {
          track = '\\'
        } else {
          throw Error()
        }

        lines[y] = `${lines[y].substring(0, x)}${track}${lines[y].substring(x + 1)}`
      }
    }
  }

  return { carts, lines }
}

export const solvePart1 = input => {
  const { lines, carts } = buildTrack(input.split('\n'))

  while (true) {
    carts.sort(topLeftPrecedence)

    for (let cidx = 0; cidx < carts.length; cidx++) {
      const c = carts[cidx]

      if (c.dir === '>') c.x = c.x + 1
      if (c.dir === '<') c.x = c.x - 1
      if (c.dir === 'v') c.y = c.y + 1
      if (c.dir === '^') c.y = c.y - 1

      const t = lines[c.y][c.x]

      if (c.dir === '>' && t === '\\') c.dir = 'v'
      else if (c.dir === '>' && t === '/') c.dir = '^'
      else if (c.dir === '<' && t === '\\') c.dir = '^'
      else if (c.dir === '<' && t === '/') c.dir = 'v'
      else if (c.dir === 'v' && t === '\\') c.dir = '>'
      else if (c.dir === 'v' && t === '/') c.dir = '<'
      else if (c.dir === '^' && t === '\\') c.dir = '<'
      else if (c.dir === '^' && t === '/') c.dir = '>'

      if (t === '+') {
        if (c.next === 'l') {
          c.next = 's'
          c.dir = LEFT[(LEFT.indexOf(c.dir) + 1) % LEFT.length]
        } else if (c.next === 's') {
          c.next = 'r'
        } else if (c.next === 'r') {
          c.next = 'l'
          c.dir = RIGHT[(RIGHT.indexOf(c.dir) + 1) % RIGHT.length]
        }
      }

      for (let i = 0; i < carts.length - 1; i++) {
        for (let j = i + 1; j < carts.length; j++) {
          if (carts[i].x === carts[j].x && carts[i].y === carts[j].y) {
            return `${carts[i].x},${carts[i].y}`
          }
        }
      }
    }
  }
}

export const solvePart2 = input => {
  const { lines, carts } = buildTrack(input.split('\n'))

  while (true) {
    carts.sort(topLeftPrecedence)

    for (let cidx = 0; cidx < carts.length; cidx++) {
      const c = carts[cidx]
      if (c.dead) continue

      if (c.dir === '>') c.x = c.x + 1
      if (c.dir === '<') c.x = c.x - 1
      if (c.dir === 'v') c.y = c.y + 1
      if (c.dir === '^') c.y = c.y - 1

      const t = lines[c.y][c.x]

      if (c.dir === '>' && t === '\\') c.dir = 'v'
      else if (c.dir === '>' && t === '/') c.dir = '^'
      else if (c.dir === '<' && t === '\\') c.dir = '^'
      else if (c.dir === '<' && t === '/') c.dir = 'v'
      else if (c.dir === 'v' && t === '\\') c.dir = '>'
      else if (c.dir === 'v' && t === '/') c.dir = '<'
      else if (c.dir === '^' && t === '\\') c.dir = '<'
      else if (c.dir === '^' && t === '/') c.dir = '>'

      if (t === '+') {
        if (c.next === 'l') {
          c.next = 's'
          c.dir = LEFT[(LEFT.indexOf(c.dir) + 1) % LEFT.length]
        } else if (c.next === 's') {
          c.next = 'r'
        } else if (c.next === 'r') {
          c.next = 'l'
          c.dir = RIGHT[(RIGHT.indexOf(c.dir) + 1) % RIGHT.length]
        }
      }

      for (let i = 0; i < carts.length - 1; i++) {
        for (let j = i + 1; j < carts.length; j++) {
          if (
            !carts[i].dead &&
            !carts[j].dead &&
            carts[i].x === carts[j].x &&
            carts[i].y === carts[j].y
          ) {
            carts[i].dead = true
            carts[j].dead = true
          }
        }
      }
    }

    const alive = carts.filter(c => !c.dead)
    if (alive.length === 1) {
      return `${alive[0].x},${alive[0].y}`
    }
  }
}
