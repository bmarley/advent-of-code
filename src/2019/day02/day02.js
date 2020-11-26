import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

function executeProgram(prog) {
  let pos = 0

  while (prog[pos] !== 99) {
    const opcode = prog[pos]

    if (opcode === 1) {
      const loc1 = prog[pos + 1]
      const loc2 = prog[pos + 2]
      const loct = prog[pos + 3]
      prog[loct] = prog[loc1] + prog[loc2]
      pos += 4
    }

    if (opcode === 2) {
      const loc1 = prog[pos + 1]
      const loc2 = prog[pos + 2]
      const loct = prog[pos + 3]
      prog[loct] = prog[loc1] * prog[loc2]
      pos += 4
    }
  }

  return pos
}

export function solvePart1(input, skipReplacement = false) {
  const prog = input.split(',').map(Number)

  if (!skipReplacement) {
    prog[1] = 12
    prog[2] = 2
  }

  executeProgram(prog)

  return prog[0]
}

export function solvePart2(input, skipReplacement = false) {
  const prog = input.split(',').map(Number)

  const targetOutput = 19690720

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const curProg = [...prog]
      curProg[1] = noun
      curProg[2] = verb

      executeProgram(curProg)

      if (curProg[0] === targetOutput) {
        return 100 * noun + verb
      }
    }
  }

  throw Error('Unable to find noun and verb')
}
