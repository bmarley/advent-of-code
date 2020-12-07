import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

function createBagMap(input) {
  const lines = input.split('\n')

  const bagObj = _.fromPairs(lines.map((line) => {
    var [, bagType, contents] = /(.+) bags contain (.+)(?:[\.,])/g.exec(line)
    return [bagType, contents]
  }))

  return _.fromPairs(_.map(bagObj, (value, key) => {
    const contents = value.split(',')

    if (contents[0].includes("no other bags")) {
      return [key, null]
    }

    const parsed = contents.map(type => {
      let [, numOfBags, bagType] = /(\d) (.+) bags?/g.exec(type)

      return {
        num: Number(numOfBags),
        bagType: bagType
      }
    })

    return [key, parsed]
  }))
}

function getContainsGolden(bags, bagMap) {
  if (!bags) {
    return false
  }

  return _.some(bags, inside => {
    if (inside.bagType === 'shiny gold') {
      return true
    } else {
      return getContainsGolden(bagMap[inside.bagType], bagMap)
    }
  })
}

function countBags(bagList, bagMap) {
  return _.reduce(bagList, (acc, bag) => {
    return acc + bag.num + bag.num * countBags(bagMap[bag.bagType], bagMap)
  }, 0)
}

export function solvePart1(input) {
  const bagMap = createBagMap(input)
  return _.reduce(bagMap, (acc, bags) => {
    return acc + getContainsGolden(bags, bagMap)
  }, 0)

}

export function solvePart2(input) {
  const bagMap = createBagMap(input)
  return countBags(bagMap['shiny gold'], bagMap)
}
