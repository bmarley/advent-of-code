import { chunk, isEqual, without, range, intersection, mapValues } from 'lodash'
import { extractNumbers } from 'src/utils.js'

const getPart1Input = input => input.substring(0, input.indexOf('\n\n\n\n'))
const getPart2Input = input =>
    input
        .substring(input.indexOf('\n\n\n\n') + 4)
        .split('\n')
        .map(extractNumbers)

const getSamples = input => {
    return chunk(getPart1Input(input).split('\n'), 4).map(c => ({
        before: { ...extractNumbers(c[0]) },
        op: extractNumbers(c[1]),
        after: { ...extractNumbers(c[2]) },
    }))
}

const exec = {
    addr: (rs, [in1, in2, out]) => ({ ...rs, [out]: rs[in1] + rs[in2] }),
    addi: (rs, [in1, in2, out]) => ({ ...rs, [out]: rs[in1] + in2 }),
    mulr: (rs, [in1, in2, out]) => ({ ...rs, [out]: rs[in1] * rs[in2] }),
    muli: (rs, [in1, in2, out]) => ({ ...rs, [out]: rs[in1] * in2 }),
    banr: (rs, [in1, in2, out]) => ({ ...rs, [out]: rs[in1] & rs[in2] }),
    bani: (rs, [in1, in2, out]) => ({ ...rs, [out]: rs[in1] & in2 }),
    borr: (rs, [in1, in2, out]) => ({ ...rs, [out]: rs[in1] | rs[in2] }),
    bori: (rs, [in1, in2, out]) => ({ ...rs, [out]: rs[in1] | in2 }),
    setr: (rs, [in1, in2, out]) => ({ ...rs, [out]: rs[in1] }),
    seti: (rs, [in1, in2, out]) => ({ ...rs, [out]: in1 }),
    gtir: (rs, [in1, in2, out]) => ({ ...rs, [out]: in1 > rs[in2] ? 1 : 0 }),
    gtri: (rs, [in1, in2, out]) => ({ ...rs, [out]: rs[in1] > in2 ? 1 : 0 }),
    gtrr: (rs, [in1, in2, out]) => ({ ...rs, [out]: rs[in1] > rs[in2] ? 1 : 0 }),
    eqir: (rs, [in1, in2, out]) => ({ ...rs, [out]: in1 === rs[in2] ? 1 : 0 }),
    eqri: (rs, [in1, in2, out]) => ({ ...rs, [out]: rs[in1] === in2 ? 1 : 0 }),
    eqrr: (rs, [in1, in2, out]) => ({ ...rs, [out]: rs[in1] === rs[in2] ? 1 : 0 }),
}

const getMatches = sample => {
    const matches = Object.keys(exec).filter(key => {
        const result = exec[key](sample.before, sample.op.slice(1))
        return isEqual(result, sample.after)
    })

    return matches
}

export const solvePart1 = input => {
    const samples = getSamples(input)

    const matchingSamples = samples.filter(s => {
        return getMatches(s).length >= 3
    })

    return matchingSamples.length
}

export const solvePart2 = input => {
    const samples = getSamples(input)
    let mappings = range(16).reduce((acc, num) => {
        acc[num] = Object.keys(exec)
        return acc
    }, {})

    samples.forEach(s => {
        const m = getMatches(s)
        mappings[s.op[0]] = intersection(mappings[s.op[0]], m)
    })

    // eslint-disable-next-line
    while (true) {
        const determined = Object.keys(mappings).filter(opCode => {
            return mappings[opCode].length === 1
        })

        if (determined.length === 16) {
            break
        }

        const undetermined = Object.keys(mappings).filter(opCode => {
            return mappings[opCode].length > 1
        })

        undetermined.forEach(opCode => {
            mappings[opCode] = without(mappings[opCode], ...determined.map(d => mappings[d][0]))
        })
    }

    mappings = mapValues(mappings, m => m[0])

    const prog = getPart2Input(input)
    let rs = { ...[0, 0, 0, 0] }

    prog.forEach(line => {
        rs = exec[mappings[line[0]]](rs, line.slice(1))
    })

    return rs[0]
}
