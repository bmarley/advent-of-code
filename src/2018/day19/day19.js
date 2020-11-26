import { extractNumbers } from '../../utils.js'

const exec = {
  addr: (rs, [in1, in2, out]) => {
    rs[out] = rs[in1] + rs[in2]
  },
  addi: (rs, [in1, in2, out]) => {
    rs[out] = rs[in1] + in2
  },
  mulr: (rs, [in1, in2, out]) => {
    rs[out] = rs[in1] * rs[in2]
  },
  muli: (rs, [in1, in2, out]) => {
    rs[out] = rs[in1] * in2
  },
  banr: (rs, [in1, in2, out]) => {
    rs[out] = rs[in1] & rs[in2]
  },
  bani: (rs, [in1, in2, out]) => {
    rs[out] = rs[in1] & in2
  },
  borr: (rs, [in1, in2, out]) => {
    rs[out] = rs[in1] | rs[in2]
  },
  bori: (rs, [in1, in2, out]) => {
    rs[out] = rs[in1] | in2
  },
  setr: (rs, [in1, in2, out]) => {
    rs[out] = rs[in1]
  },
  seti: (rs, [in1, in2, out]) => {
    rs[out] = in1
  },
  gtir: (rs, [in1, in2, out]) => {
    rs[out] = in1 > rs[in2] ? 1 : 0
  },
  gtri: (rs, [in1, in2, out]) => {
    rs[out] = rs[in1] > in2 ? 1 : 0
  },
  gtrr: (rs, [in1, in2, out]) => {
    rs[out] = rs[in1] > rs[in2] ? 1 : 0
  },
  eqir: (rs, [in1, in2, out]) => {
    rs[out] = in1 === rs[in2] ? 1 : 0
  },
  eqri: (rs, [in1, in2, out]) => {
    rs[out] = rs[in1] === in2 ? 1 : 0
  },
  eqrr: (rs, [in1, in2, out]) => {
    rs[out] = rs[in1] === rs[in2] ? 1 : 0
  },
}

export const solvePart1 = input => {
  const lines = input.split('\n')

  const instructionRegister = extractNumbers(lines[0])[0]
  const rs = { ...[1, 0, 0, 0, 0, 0] }
  const prog = lines.slice(1).map(l => {
    const parts = l.split(' ')
    return { op: parts[0], args: parts.slice(1).map(Number) }
  })

  let ip = 0
  while (ip < prog.length) {
    const line = prog[ip]
    rs[instructionRegister] = ip
    exec[line.op](rs, line.args)
    ip = rs[instructionRegister] + 1
  }

  return rs[0]
}

export const solvePart2 = input => {
  const lines = input.split('\n')

  const instructionRegister = extractNumbers(lines[0])[0]
  const rs = { ...[1, 0, 0, 0, 0, 0] }
  const prog = lines.slice(1).map(l => {
    const parts = l.split(' ')
    return { op: parts[0], args: parts.slice(1).map(Number) }
  })

  let ip = 0
  while (ip < prog.length) {
    const line = prog[ip]
    rs[instructionRegister] = ip
    exec[line.op](rs, line.args)

    if (ip === 3) {
      rs[0] = 0

      const num = rs[1]
      for (let k = 1; k <= num; k++) {
        if (num % k === 0) {
          rs[0] += k
        }
      }
      break
    }

    ip = rs[instructionRegister] + 1
  }

  return rs[0]
}
