import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

export function solvePart1(input) {
    const groups =input.split('\n\n').map(l => l.replace(/\n/g, ''))

    return groups.map((group) => {
        var answers = group.replace(' ', '').replace('\n', '');
        return _.uniq(answers).length
    }).reduce((acc, toSum) => acc + toSum, 0)
}

export function solvePart2(input) {
    const groups =input.split('\n\n')

    return groups.map((group) => {
        let answers = group.replace(' ', '').split('\n').map(simp => simp.split(''))
        return _.intersection(...answers).length
    }).reduce((acc, toSum) => acc + toSum, 0)
}
