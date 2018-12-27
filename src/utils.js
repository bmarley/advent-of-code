import { range, pad } from 'lodash'

// Returns Array<Number>
export const linesToNumbers = input => input.split('\n').map(Number)

// Returns Array<Number> of every number found in the line
export const extractNumbers = str =>
    (str.match(/-?[0-9.,]+/g) || []).map(n => n.replace(/,/g, '')).map(Number)

// Returns true if given Object has some key with a value matching val
export const hasVal = (obj, val) => Object.values(obj).some(v => v === val)

// For testing input trimming
export const trim = str =>
    str
        .split('\n')
        .map(l => l.replace(/^\s*/, ''))
        .filter(l => l !== '')
        .join('\n')

export const Array2d = (sizeX, sizeY, fill) => {
    const grid = Array(sizeX)
        .fill()
        .map(() => {
            const arr = Array(sizeY)
            if (typeof fill !== 'undefined') {
                arr.fill(fill)
            }
            return arr
        })

    grid.print = (padSize = 5, minX = 0, minY = 0, maxX = sizeX, maxY = sizeY) => {
        let str = ''

        range(minY, maxY).forEach(y => {
            range(minX, maxX).forEach(x => {
                str += pad(grid[x][y], padSize)
            })
            str += '\n'
        })

        console.log(str)
    }

    return grid
}
