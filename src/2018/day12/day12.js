import _ from 'lodash'

const { times } = _

const nextGen = (state, rules) => {
  let shift = 0

  const firstPlant = state.indexOf('#')
  if (firstPlant < 4) {
    state.unshift(...Array(4 - firstPlant).fill('.'))
    shift = 4 - firstPlant
  }

  const lastPlant = state.lastIndexOf('#')
  if (lastPlant > state.length - 5) {
    state.push(...Array(lastPlant - (state.length - 5)).fill('.'))
  }

  const ns = Array(state.length)

  for (let idx = 0; idx < ns.length; idx++) {
    if (idx < 2 || idx > ns.length - 2) {
      ns[idx] = '.'
    } else {
      const test = state.slice(idx - 2, idx + 3).join('')
      ns[idx] = rules.includes(test) ? '#' : '.'
    }
  }

  return { shift, nextState: ns }
}

export const solvePart1 = input => {
  const lines = input.split('\n')
  const initialState = lines[0].substring('initial state: '.length).split('')
  const rules = lines
    .slice(1)
    .filter(l => !l.endsWith('.'))
    .map(l => l.substring(0, 5))

  let base = 0
  let state = initialState

  times(20, generation => {
    const { shift, nextState } = nextGen(state, rules)
    base += shift
    state = nextState
  })

  const sum = state.reduce((acc, slot, idx) => {
    return slot === '#' ? acc + (idx - base) : acc
  }, 0)

  return sum
}

export const solvePart2 = input => {
  const lines = input.split('\n')
  const initialState = lines[0].substring('initial state: '.length).split('')
  const rules = lines
    .slice(1)
    .filter(l => !l.endsWith('.'))
    .map(l => l.substring(0, 5))

  let base = 0
  let state = initialState

  times(100, generation => {
    const { shift, nextState } = nextGen(state, rules)
    base += shift
    state = nextState
  })

  const sum = state.reduce((acc, slot, idx) => {
    return slot === '#' ? acc + (idx - base) : acc
  }, 0)

  return sum + (50000000000 - 100) * 91
}
