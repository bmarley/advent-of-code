import { maxBy } from 'lodash'

const move = {
    N: node => ({ x: node.x, y: node.y - 1, dist: node.dist + 1 }),
    E: node => ({ x: node.x + 1, y: node.y, dist: node.dist + 1 }),
    S: node => ({ x: node.x, y: node.y + 1, dist: node.dist + 1 }),
    W: node => ({ x: node.x - 1, y: node.y, dist: node.dist + 1 }),
}

class Grid {
    grid = {}

    get(x, y) {
        return this.grid[`${x},${y}`] || { x, y, dist: Infinity }
    }

    set(node) {
        const existingNode = this.get(node.x, node.y)
        if (!existingNode || node.dist < existingNode.dist) {
            this.grid[`${node.x},${node.y}`] = node
        }
    }

    get nodes() {
        return Object.values(this.grid)
    }

    furthest() {
        return maxBy(this.nodes, 'dist')
    }
}

const traverse = (grid, input) => {
    let currentNode = { x: 0, y: 0, dist: 0 }
    grid.set(currentNode)

    const stack = []
    for (let c of input) {
        if (move.hasOwnProperty(c)) {
            currentNode = move[c](currentNode)
            grid.set(currentNode)
        }

        if (c === '(') {
            stack.push(currentNode)
        }

        if (c === ')') {
            currentNode = stack.pop()
        }

        if (c === '|') {
            currentNode = stack[stack.length - 1]
        }
    }
}

export const solvePart1 = input => {
    const grid = new Grid()
    traverse(grid, input.substring(1, input.length - 1))
    return grid.furthest().dist
}

export const solvePart2 = input => {
    const grid = new Grid()
    traverse(grid, input.substring(1, input.length - 1))
    return grid.nodes.filter(n => n.dist >= 1000).length
}
