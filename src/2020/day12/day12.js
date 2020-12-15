import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

export function solvePart1(input) {

  const actions = parseActions(input)

  let shipState = {
    facing: 90,
    coords: {x: 0, y: 0}
  }

  shipState = actions.reduce((acc, action) => {
    if (action.instr === 'F') {
      action.instr = Facing[acc.facing]
    }

    switch(action.instr) {
      case 'N':
      case 'S':
      case 'E':
      case 'W':
        let [direction, multiplier] = Move[action.instr]
        acc.coords[direction] = acc.coords[direction] + multiplier * action.amount
        break;
      case 'L':
      case 'R':
        let rotation = action.instr === 'L' ? 360 - action.amount : action.amount
        acc.facing = (acc.facing + rotation) % 360
        break;
    }
    return acc;
  }, shipState)

  return U.manhattan({x: 0, y: 0}, shipState.coords)
}

export function solvePart2(input) {
  const actions = parseActions(input)

  const starting = {x: 0, y: 0}
  const waypoint = {x: 10, y: 1}

  let shipState = {
    coords: {...starting},
    waypoint: {...waypoint}
  }

  shipState = actions.reduce((acc, action) => {
    switch(action.instr) {
      case 'N':
      case 'S':
      case 'E':
      case 'W':
        let [direction, multiplier] = Move[action.instr]
        acc.waypoint[direction] = acc.waypoint[direction] + multiplier * action.amount
        break;
      case 'L':
      case 'R':
        let currCoords = {...acc.waypoint}
        let rotation = action.instr === 'L' ? 360 - action.amount : action.amount
        let currPos = +(currCoords.x < 0) + '' + +(currCoords.y < 0)
        currCoords = {x: Math.abs(currCoords.x), y: Math.abs(currCoords.y)}

        switch (rotation) {
          case 90:
          case 270:
            let [xMul, yMul] = Rotate[rotation][currPos]
            acc.waypoint.x = currCoords.y * xMul
            acc.waypoint.y = currCoords.x * yMul
            break;
          case 180:
            acc.waypoint.x = -acc.waypoint.x
            acc.waypoint.y = -acc.waypoint.y
            break;
        }
        break;
      case 'F':
        let currWaypoint = acc.waypoint;
        acc.coords.x = acc.coords.x + (currWaypoint.x * action.amount);
        acc.coords.y = acc.coords.y + currWaypoint.y * action.amount;
        break;
    }

    return acc;
  }, shipState)

  return U.manhattan(starting, shipState.coords)
}

const parseActions = (input) => {
  let parsed = input.split('\n')

  return  parsed.map(a => {
    return {
      instr: a[0],
      amount: Number(a.substring(1))
    }
  })
}

const Rotate = {
  90: {
    '11': [-1, 1],
    '01': [-1, -1],
    '10': [1, 1],
    '00': [1, -1],
  },
  270: {
    '11': [1, -1],
    '01': [1, 1],
    '10': [-1, -1],
    '00': [-1, 1],
  }
}

const Move = {
  'N': ['y', 1],
  'S': ['y', -1],
  'E': ['x', 1],
  'W': ['x', -1]
}

const Facing = {
  0: 'N',
  90: 'E',
  180: 'S',
  270: 'W'
}
