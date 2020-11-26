import _ from 'lodash'

const { sum, max, maxBy, range, forEach } = _

/*
 * Parses input lines into an Array<Guard>, where Guard is:
 *
 * {
 *   id: Number
 *   minutesAsleep: Array of number of minutes guard spent asleep,
 *                  where the array index is a minute from 0-59
 *   maxMinuteAsleep: Number from 0-59 representing the minute that
 *                    the guard was asleep most frequently
 *   totalMinutesAsleep: Number
 * }
 */
const getGuards = input => {
  const guards = {}
  let guard = null

  const initGuard = id => {
    if (!guards[id]) {
      guards[id] = { id, minutesAsleep: Array(60).fill(0) }
    }

    guard = guards[id]
  }

  const events = input.split('\n').sort()

  events.forEach((e, idx) => {
    const newGuard = /#(\d+)/.exec(e)
    if (newGuard) {
      initGuard(Number(newGuard[1]))
      return null
    }

    if (e.includes('falls asleep')) {
      const minute = Number(/:(\d{2})/.exec(e)[1])

      const wakeEvent = events[idx + 1]
      const wakeMinute = Number(/:(\d{2})/.exec(wakeEvent)[1])

      range(minute, wakeMinute).forEach(m => guard.minutesAsleep[m]++)
    }
  })

  forEach(guards, guard => {
    guard.maxMinuteAsleep = guard.minutesAsleep.indexOf(max(guard.minutesAsleep))
    guard.totalMinutesAsleep = sum(guard.minutesAsleep)
  })

  return Object.values(guards)
}

export const solvePart1 = input => {
  const guards = getGuards(input)

  const g = maxBy(guards, 'totalMinutesAsleep')
  return g.id * g.maxMinuteAsleep
}

export const solvePart2 = input => {
  const guards = getGuards(input)

  const g = maxBy(guards, guard => max(guard.minutesAsleep))
  return g.id * g.minutesAsleep.indexOf(max(g.minutesAsleep))
}
