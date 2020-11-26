import _ from 'lodash'

const { minBy } = _

const peek = stack => stack[stack.length - 1]

const factorPolymer = input => {
  const stack = []

  input.split('').forEach(char => {
    // XOR of A and a, B and b, etc is 32
    if (!stack.length || (peek(stack).charCodeAt() ^ char.charCodeAt()) !== 32) {
      stack.push(char)
    } else {
      stack.pop()
    }
  })

  return stack.join('')
}

export const solvePart1 = input => {
  return factorPolymer(input).length
}

export const solvePart2 = input => {
  input = factorPolymer(input) // A first factorization pass speeds up the following passes

  const polymers = Array(26) // Indexes 0-26 represent 65-91 ASCII codes
    .fill()
    .map((e, i) => {
      const re = new RegExp(String.fromCharCode(i + 65), 'gi')
      const strippedInput = input.replace(re, '')
      return factorPolymer(strippedInput)
    })

  return minBy(polymers, 'length').length
}
