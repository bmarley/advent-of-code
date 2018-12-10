import { minBy, maxBy } from 'lodash'
import { extractNumbers } from 'src/utils.js'

const getArea = points => {
    const minX = minBy(points, 'x').x
    const maxX = maxBy(points, 'x').x
    const minY = minBy(points, 'y').y
    const maxY = maxBy(points, 'y').y
    return {
        val: (maxX - minX) * (maxY - minY),
        points: { minX, maxX, minY, maxY },
    }
}

export const solvePart1 = input => {
    let points = input.split('\n').map(i => {
        const [x, y, vx, vy] = extractNumbers(i)
        return { x, y, vx, vy }
    })

    let tick = 0
    let approaching = true
    let area = getArea(points)

    while (approaching) {
        const newPoints = points.map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
        }))

        const newArea = getArea(newPoints)

        if (newArea.val > area.val) {
            approaching = false
        } else {
            area = newArea
            points = newPoints
            tick++
        }
    }

    let str = ''
    for (let y = area.points.minY - 2; y < area.points.maxY + 2; y++) {
        for (let x = area.points.minX - 2; x < area.points.maxX + 2; x++) {
            const p = points.find(p => p.x === x && p.y === y)
            if (p) {
                str += '* '
            } else {
                str += '  '
            }
        }
        str += '\n'
    }

    console.log(str)
    console.log('Tick', tick)
}
