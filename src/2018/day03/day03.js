const SIZE = 1000

const makeCloth = rects => {
    const cloth = []
    for (let i = 0; i < SIZE; i++) {
        cloth[i] = []
        for (let j = 0; j < SIZE; j++) {
            cloth[i][j] = []
        }
    }

    rects.forEach(r => {
        for (let i = r.x; i < r.x + r.w; i++) {
            for (let j = r.y; j < r.y + r.h; j++) {
                cloth[i][j].push(r)
            }
        }
    })

    return cloth
}

// eslint-disable-next-line
const print = cloth => {
    let str = ''
    for (let i = 0; i < cloth.length; i++) {
        for (let j = 0; j < cloth.length; j++) {
            str += `${cloth[i][j].length} `
        }
        str += '\n'
    }
    console.log(str)
}

const parseLine = line => {
    const [, id, x, y, w, h] = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/.exec(line)
    return { id, x: Number(x), y: Number(y), w: Number(w), h: Number(h) }
}

export const solvePart1 = input => {
    const rects = input.split('\n').map(parseLine)
    const cloth = makeCloth(rects)

    const overclaimed = cloth.reduce((sum, row) => {
        return sum + row.filter(cell => cell.length > 1).length
    }, 0)

    return overclaimed
}

export const solvePart2 = input => {
    const rects = input.split('\n').map(parseLine)
    const cloth = makeCloth(rects)

    const set = new Set(rects)

    for (let i = 0; i < cloth.length; i++) {
        for (let j = 0; j < cloth.length; j++) {
            if (cloth[i][j].length > 1) {
                cloth[i][j].forEach(r => {
                    set.delete(r)
                })
            }
        }
    }

    if (set.size !== 1) throw Error('Set length not 1')

    return set.values().next().value.id
}
