import { sum, max, maxBy, map, groupBy } from 'lodash'
import { isBefore, getMinutes, addMinutes } from 'date-fns'

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
const getGuardTimes = input => {
    const lineRegex = /\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})].*/
    let guard = null

    const allEvents = input.split('\n')
        .sort()
        .map(e => {
            const [, , month, day, hour, minute] = lineRegex.exec(e)
            const date = new Date(Date.UTC(2018, month, day, hour, minute, 0))
            const text = e.substring('[1518-11-01 00:00] '.length)

            const newGuard = /#(\d+)/.exec(e)
            if (newGuard) {
                guard = Number(newGuard[1])
                return null
            }

            return { date, text, id: guard }
        })
        .filter(Boolean)

    return map(groupBy(allEvents, 'id'), (events, id) => {
        const minutesAsleep = Array(60).fill(0)

        events.forEach((e, idx) => {
            if (e.text === 'falls asleep') {
                const wakeEvent = events[idx + 1]

                let date = e.date
                while (isBefore(date, wakeEvent.date)) {
                    minutesAsleep[getMinutes(date)]++
                    date = addMinutes(date, 1)
                }
            }
        })

        return {
            id,
            minutesAsleep,
            maxMinuteAsleep: minutesAsleep.indexOf(max(minutesAsleep)),
            totalMinutesAsleep: sum(minutesAsleep),
        }
    })
}

export const solvePart1 = input => {
    const guardTimes = getGuardTimes(input)

    const g = maxBy(guardTimes, 'totalMinutesAsleep')
    return g.id * g.maxMinuteAsleep
}

export const solvePart2 = input => {
    const guardTimes = getGuardTimes(input)

    const g = maxBy(guardTimes, guard => max(guard.minutesAsleep))
    return g.id * g.minutesAsleep.indexOf(max(g.minutesAsleep))
}
