import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

const SUM = 2020;

//Sorted input, start from min and try to find match until index value is greater than SUM - min
//If no match, slice the min value (which has had all permutations checked), and all values that were greater than sum - min

//paramFunc: (searchSpace) => {
// min - current minimum (value or sum of values) 
// product - (initial product of search)
// start (index to start search on)
// newSearchSpaceFunc (maxIndex) => (new space to search, should answer not be found)
//}
function search(searchSpace, paramFunc) {
  const {min, product, start, newSearchSpaceFunc} = paramFunc(searchSpace)

  if (searchSpace.length <= start) {
    return -1;
  }

  let x = start;
  
  for (x; x < searchSpace.length && searchSpace[x] <= (SUM - min); x++) {
    if (min + searchSpace[x] === SUM) {
      return product * searchSpace[x]
    }
  }

  return search(newSearchSpaceFunc(x), paramFunc)
}

export function solvePart1(input) {
  input = U.linesToNumbersSorted(input)
  const paramFunc = (searchSpace) => {
    return {
      min: searchSpace[0], 
      product: searchSpace[0], 
      start: 1,
      newSearchSpaceFunc: (maxIndex) => searchSpace.slice(1, maxIndex)
    }
  }

  return search(input, paramFunc)
}

export function solvePart2(input) {
  input = U.linesToNumbersSorted(input)
  const paramFunc = (searchSpace) => {
    return {
        min: searchSpace[0] + searchSpace[1], 
        product: searchSpace[0] * searchSpace[1], 
        start: 2,
        newSearchSpaceFunc: (maxIndex) => {
          let newSearchSpace = searchSpace.slice(2, maxIndex);
          newSearchSpace.unshift(searchSpace[0])
          return newSearchSpace;
        }
      }
  }

  let answer = search(input, paramFunc);
  
  while (answer === -1) {
    input.shift();
    answer = search(input, paramFunc)
  }
  
  return answer 
}
