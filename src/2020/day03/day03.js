import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line


const getIndex = (slope, yCoord, line) => {
  const xCoord = (yCoord * slope)
  const indexValue = slope >= 1 ? line[xCoord % line.length] : yCoord % 1/slope === 0 ? line[xCoord % line.length] : 'x';
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
  const counts = lines.map(l => l.split('')).reduce((acc, line, index) => {
    const currIndexCounts = [getIndex(1, index, line), getIndex(3, index, line), getIndex(5, index, line), getIndex(7, index, line), getIndex(1/2, index, line)]
    return _.zipWith(acc, currIndexCounts, (a, cI) => (a || 0) + cI)
  }, [])
  
  return counts.reduce((acc, c) => acc * c)
}
