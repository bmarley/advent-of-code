import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

const readInstructions = (input) => {
  var lines = input.split('\n')
  return lines.map(l => {
    let [, instr, argument] = /(.+)\s(.+)/g.exec(l)
    return {
      instr,
      arg: Number(argument)
    }
  })
}

const exec = (operations, findFix = false, loc = 0, acc = 0, seen = []) => {

  while(!seen[loc] && operations[loc]) {
    const { instr, arg } = operations[loc]
    const currLoc = loc;

    switch (instr) {
      case "acc":
        acc += arg
        loc += 1
        break;
      case "nop":
        loc += 1
        break;
      case "jmp":
        loc += arg
        break;
    }

    if (findFix && instr !== 'acc') {
      const opCopy = [...operations]
      opCopy[currLoc] = {
        instr: instr === 'jmp' ? 'nop' : 'jmp',
        arg
      }

      const result = exec(opCopy, false, currLoc, acc, [...seen]);
      if (!result.inf) return result
    }

    seen[currLoc] = true
  }

  return {inf: seen[loc], acc}
}

export function solvePart1(input) {
  var operations = readInstructions(input)
  return exec(operations).acc
}

export function solvePart2(input) {
  var operations = readInstructions(input)
  return exec(operations, true).acc
}
