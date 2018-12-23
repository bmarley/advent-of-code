import { isEmpty, without, minBy, flatMap, padStart, sortBy } from 'lodash'

const manhattan = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)

const readingOrder = (a, b) => {
    if (a.y !== b.y) return a.y - b.y
    if (a.x !== b.x) return a.x - b.x
    return 0
}

const getGame = input => {
    let Es = []
    let Gs = []

    const grid = input.split('\n').map((l, y) => {
        return l.split('').map((char, x) => {
            if (char === '#' || char === '.') return char

            if (char === 'E') {
                Es.push({ x, y, hp: 200, ap: 3, type: 'E' })
                return '.'
            }

            if (char === 'G') {
                Gs.push({ x, y, hp: 200, ap: 3, type: 'G' })
                return '.'
            }

            throw Error()
        })
    })

    const game = { Es, Gs, grid }

    game.curGrid = () => {
        const cur = Array(grid.length)

        for (let y = 0; y < grid.length; y++) {
            cur[y] = Array(grid[y].length)
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === '#') {
                    cur[y][x] = '#'
                    continue
                }

                let unit = game.Es.find(e => x === e.x && y === e.y)
                if (unit) {
                    cur[y][x] = unit
                    continue
                }

                unit = game.Gs.find(g => x === g.x && y === g.y)
                if (unit) {
                    cur[y][x] = unit
                    continue
                }

                cur[y][x] = '.'
            }
        }

        return cur
    }

    return game
}

// eslint-disable-next-line
const print = game => {
    let str = ''
    for (let y = 0; y < game.grid.length; y++) {
        for (let x = 0; x < game.grid[y].length; x++) {
            if (game.grid[y][x] === '#') {
                str += '#'
            } else {
                if (game.Es.some(e => x === e.x && y === e.y)) {
                    str += 'E'
                } else if (game.Gs.some(g => x === g.x && y === g.y)) {
                    str += 'G'
                } else {
                    str += '.'
                }
            }
        }

        const units = [...game.Es.filter(u => u.y === y), ...game.Gs.filter(u => u.y === y)]
        units.sort((a, b) => a.x - b.x)

        str += '   '
        str += units.map(u => `${u.type} (${u.hp})`).join(', ')
        str += '\n'
    }

    console.log(str)
}

const unitAt = (game, x, y) => {
    let unit = game.Es.find(e => x === e.x && y === e.y)
    if (unit) return unit

    unit = game.Gs.find(g => x === g.x && y === g.y)
    if (unit) return unit

    return null
}

const findTargets = (game, c) => {
    return c.type === 'E' ? game.Gs : game.Es
}

const findInRangeTarget = (unit, targets) => {
    const inRange = targets.filter(t => manhattan(unit, t) === 1)

    if (isEmpty(inRange)) return null

    return minBy(
        inRange,
        t => `${padStart(t.hp, 3, 0)},${padStart(t.y, 3, 0)},${padStart(t.x, 3, 0)}`
    )
}

const attack = (game, unit, target) => {
    target.hp -= unit.ap

    if (target.hp <= 0) {
        if (target.type === 'E') game.Es = without(game.Es, target)
        if (target.type === 'G') game.Gs = without(game.Gs, target)
    }
}

const emptyAdjacent = (game, x, y) => {
    const candidates = [[x, y + 1], [x, y - 1], [x + 1, y], [x - 1, y]]
    const curGrid = game.curGrid()

    return candidates
        .filter(([cx, cy]) => curGrid[cy][cx] === '.')
        .map(([cx, cy]) => ({ x: cx, y: cy }))
}

const buildDistanceGrid = (grid, pos, curDistance = 0) => {
    if (grid[pos.y][pos.x] === -1) {
        // Obstacled spot
        return
    }

    if (grid[pos.y][pos.x] <= curDistance) {
        // We've already been here in an equal or shorter path
        return
    } else {
        grid[pos.y][pos.x] = curDistance
    }

    const neighbors = []
    if (grid[pos.y + 1][pos.x] >= 0) neighbors.push({ x: pos.x, y: pos.y + 1 })
    if (grid[pos.y - 1][pos.x] >= 0) neighbors.push({ x: pos.x, y: pos.y - 1 })
    if (grid[pos.y][pos.x + 1] >= 0) neighbors.push({ x: pos.x + 1, y: pos.y })
    if (grid[pos.y][pos.x - 1] >= 0) neighbors.push({ x: pos.x - 1, y: pos.y })

    neighbors.forEach(n => {
        if (n.y < 0 || n.y >= grid.length) return
        if (n.x < 0 || n.x >= grid[0].length) return
        buildDistanceGrid(grid, n, curDistance + 1)
    })
}

const getDistanceGrid = (game, pos) => {
    const distances = game.curGrid().map((line, y) => {
        return line.map((cell, x) => {
            if (cell === '.') return Infinity
            if (pos.x === x && pos.y === y) return Infinity
            return -1
        })
    })

    buildDistanceGrid(distances, pos)

    return distances
}

const move = (game, unit, targets) => {
    const distances = getDistanceGrid(game, { x: unit.x, y: unit.y })
    const candidates = flatMap(targets, target => emptyAdjacent(game, target.x, target.y))

    candidates.forEach(c => {
        c.distance = distances[c.y][c.x]
    })

    const reachable = candidates.filter(c => c.distance > 0 && c.distance < Infinity)
    reachable.sort((a, b) => a.distance - b.distance)

    if (isEmpty(reachable)) return

    const nearest = reachable.filter(r => r.distance === reachable[0].distance)
    const chosen = nearest.sort(readingOrder)[0]

    const distancesFromChosen = getDistanceGrid(game, { x: chosen.x, y: chosen.y })
    const unitNeighbors = sortBy(
        [
            { x: unit.x, y: unit.y + 1, distance: distancesFromChosen[unit.y + 1][unit.x] },
            { x: unit.x, y: unit.y - 1, distance: distancesFromChosen[unit.y - 1][unit.x] },
            { x: unit.x + 1, y: unit.y, distance: distancesFromChosen[unit.y][unit.x + 1] },
            { x: unit.x - 1, y: unit.y, distance: distancesFromChosen[unit.y][unit.x - 1] },
        ].filter(n => n.distance >= 0),
        'distance'
    )
    const shortestNeighbors = unitNeighbors.filter(n => n.distance === unitNeighbors[0].distance)
    const nextMove = shortestNeighbors.sort(readingOrder)[0]

    unit.x = nextMove.x
    unit.y = nextMove.y
}

const tick = game => {
    const units = []
    for (let y = 0; y < game.grid.length; y++) {
        for (let x = 0; x < game.grid[y].length; x++) {
            const unit = unitAt(game, x, y)
            if (unit) units.push(unit)
        }
    }

    for (let unit of units) {
        if (unit.hp <= 0) continue

        const targets = findTargets(game, unit)
        if (isEmpty(targets)) return false

        let inRangeTarget = findInRangeTarget(unit, targets)
        if (!inRangeTarget) {
            move(game, unit, targets)
            inRangeTarget = findInRangeTarget(unit, targets)
        }

        if (inRangeTarget) {
            attack(game, unit, inRangeTarget)
        }
    }

    return true
}

export const solvePart1 = input => {
    const game = getGame(input)

    // console.log('INITIAL')
    // print(game)

    let tickCount = 0
    while (tick(game) && tickCount++ < 1000) {
        // Do nothing - just wait for the game to terminate
    }

    // console.log(`FINAL (${tickCount} ticks)`)
    // print(game)

    const totalHp = [...game.Es, ...game.Gs].reduce((acc, u) => acc + u.hp, 0)
    return tickCount * totalHp
}

export const solvePart2 = input => {
    let tickCount = 0
    let ap = 4

    // eslint-disable-next-line
    while (true) {
        tickCount = 0

        const game = getGame(input)
        const numElves = game.Es.length
        game.Es.forEach(e => (e.ap = ap))

        while (tick(game) && tickCount++ < 1000) {
            // Do nothing - just wait for the game to terminate
        }

        if (game.Es.length === numElves) {
            const totalHp = [...game.Es, ...game.Gs].reduce((acc, u) => acc + u.hp, 0)
            return tickCount * totalHp
        }

        ap++
    }
}
