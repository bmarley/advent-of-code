import _ from 'lodash' // eslint-disable-line
import * as U from '../../utils.js' // eslint-disable-line

export function solvePart1(input) {
  let count = 0;
  const passwords = input.split('\n')
  passwords.forEach(testpw => {
    let [policy, letter, password] = testpw.split(" ")
    letter = letter.replace(':', '')
    const [first, second] = policy.split('-');
    const regex = new RegExp(`^(?:[^${letter}]*${letter}){${first},${second}}z`, "g")
    count+=!!password.match(regex)
  })
  return count;
}

export function solvePart2(input) {
  let count = 0;
  const passwords = input.split('\n')
  passwords.forEach(testpw => {
    let [policy, letter, password] = testpw.split(" ")
    letter = letter.replace(':', '')
    const [first, second] = policy.split('-');

    if (password[first-1] === letter && password[second-1] !== letter ||
        password[first-1] !== letter && password[second-1] === letter) {
          count += 1;
    }
    
  })
  return count;
}
