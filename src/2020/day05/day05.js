import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

const getSeatValue = (seatString) => {
  let seatInfo = seatString.split('')
  let currMinFB = 0;
  let currMaxFB = 127;
  let currMinLR = 0;
  let currMaxLR = 7;
  seatInfo.forEach(info => {
    switch(info) {
      case 'F':
        currMinFB = currMinFB;
        currMaxFB = currMinFB + Math.floor((currMaxFB-currMinFB) / 2)
        break;
      case 'B':
        currMaxFB = currMaxFB;
        currMinFB = currMinFB + Math.ceil((currMaxFB-currMinFB) / 2)
        break;
      case 'L':
          currMinLR = currMinLR;
          currMaxLR = currMinLR + Math.floor((currMaxLR-currMinLR) / 2)
        break;
      case 'R':
          currMaxLR = currMaxLR;
          currMinLR = currMinLR + Math.ceil((currMaxLR-currMinLR) / 2)
        break;
    }
  })
  return currMaxFB * 8 + currMaxLR;
}

export function solvePart1(input) {
  var lines = input.split('\n')
  var max = 0;
  lines.forEach(line => {
    if (getSeatValue(line) > max) {
      max = getSeatValue(line) ;
    }
  })
  return max;
}

export function solvePart2(input) {
  var lines = input.split('\n')
  let seats = lines.map(line => {
    return getSeatValue(line)
  })

  let prevSeat = 0;
  let missingSeat = 0;

  seats.sort((a,b) => a - b).forEach((seat, index) => {
    if (index === 0) {
      prevSeat = seat;
    } 

    if (seat - 1 !== prevSeat) {
      missingSeat = seat-1;
    }
    prevSeat = seat;
    
  })

  return missingSeat
}
