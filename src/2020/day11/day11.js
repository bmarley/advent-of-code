import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

export function solvePart1(input) {
  return solve(input, 4)
}

export function solvePart2(input) {
  return solve(input, 5, false)
}

const solve = (input, maxOccupancy, immediate = true) => {
  let state = input.split('\n').map(row => row.split(''));
  let nextState = getNextState(state, maxOccupancy, immediate)

  while(!_.isEqual(state, nextState)) {
    state = nextState
    nextState = getNextState(state, maxOccupancy, immediate)
  }

  return getNumOccupiedSeats(state)
}

const getNumOccupiedSeats = (rows) => {
  return _.flatten(rows).filter(e => e === '#').length
}

const getNextState = (state, maxOccupancy, immediate) => {
  return state.map((row, y) => {
    return row.map((seat, x) => {

      const adjacent = getAdjacentList({x, y}, state, immediate)
      const numOccupied = adjacent.filter(a => a === '#').length;

      if (seat === '.') return seat

      return numOccupied >= maxOccupancy ? 'L' : numOccupied === 0 ? '#' : seat

    })
  })
}

const getAdjacentList = (coords, state, immediate) => {
  return [getAdjacentSeat('N', coords, state, immediate),
    getAdjacentSeat('NE', coords, state, immediate),
    getAdjacentSeat('E', coords, state, immediate),
    getAdjacentSeat('SE', coords, state, immediate),
    getAdjacentSeat('S', coords, state, immediate),
    getAdjacentSeat('SW', coords, state, immediate),
    getAdjacentSeat('W', coords, state, immediate),
    getAdjacentSeat('NW', coords, state, immediate)]
}

const getAdjacentSeat = (direction, {x, y}, state, immediate) => {
  while (true) {
    switch (direction) {
      case 'N':
        y--;
        break;
      case 'NE':
        y--;
        x++;
        break;
      case 'E':
        x++;
        break;
      case 'SE':
        y++;
        x++;
        break;
      case 'S':
        y++;
        break;
      case 'SW':
        y++;
        x--;
        break;
      case 'W':
        x--;
        break;
      case 'NW':
        y--;
        x--;
        break;
    }

    if (y < 0 || y > state.length-1 || x < 0 || x > state[y].length-1) {
      return null
    }

    if (immediate || (state[y][x] !== '.' && !immediate)) {
      return state[y][x]
    }
  }
}
