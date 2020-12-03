import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line


const getIndex = (slope, yCoord, line) => {
  const xCoord = (yCoord * slope)
  const indexValue = slope > 1 ? line[xCoord % line.length] : yCoord % 1/slope === 0 ? line[xCoord % line.length] : 'x';
  return indexValue === "#" ? 1 : 0;
};

export function solvePart1(input) {
  var lines = input.split('\n')
  var count = 0;
  lines.forEach((element, index) => {
    var line = element.split('');
    count += getIndex(3, index, line)
  });
  return count;
}

export function solvePart2(input) {
  var lines = input.split('\n')
  var count1 = 0;
  var count2 = 0;
  var count3 = 0;
  var count4 = 0;
  var count5 = 0;
  lines.forEach((element, index) => {
    var line = element.split('');
    count1 += getIndex(1, index, line)
    count2 += getIndex(3, index, line)
    count3 += getIndex(5, index, line)
    count4 += getIndex(7, index, line)
    count5 += getIndex(1/2, index, line)
  });
  return count1 * count2 * count3 * count4 * count5;
}
