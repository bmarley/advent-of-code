import _ from 'lodash'

const { range, without, mapValues } = _

const WORKERS = process.env.NODE_ENV === 'test' ? 2 : 5
const DELAY = process.env.NODE_ENV === 'test' ? 0 : 60

const getGraph = input =>
  input
    .split('\n')
    .map(l => [l.charAt(5), l.charAt(36)])
    .reduce((acc, [prereq, target]) => {
      if (!acc[prereq]) acc[prereq] = []
      if (!acc[target]) acc[target] = []
      acc[target].push(prereq)
      return acc
    }, {})

const traverse = (graph, result = []) => {
  const [next] = Object.keys(graph)
    .filter(k => graph[k].length === 0)
    .sort()

  if (!next) return result

  result.push(next)
  graph = mapValues(graph, r => without(r, next))
  delete graph[next]

  return traverse(graph, result)
}

export const solvePart1 = input => {
  const graph = getGraph(input)
  return traverse(graph).join('')
}

const tick = (workers, graph, count = 0) => {
  workers.forEach(worker => {
    if (worker.task) {
      worker.length--

      if (worker.length === 0) {
        graph = mapValues(graph, r => without(r, worker.task))
        worker.task = null
      }
    }
  })

  const pending = Object.keys(graph).filter(k => graph[k].length === 0)

  if (!pending.length && workers.every(w => w.length === 0)) {
    return count
  }

  workers.forEach((worker, i) => {
    if (!worker.task) {
      if (pending.length) {
        const next = pending.shift()
        worker.task = next
        worker.length = next.charCodeAt() - 64 + DELAY
        delete graph[worker.task]
      }
    }
  })

  return tick(workers, graph, count + 1)
}

export const solvePart2 = input => {
  const graph = getGraph(input)
  const workers = range(0, WORKERS).map(i => ({ task: null, length: 0 }))
  return tick(workers, graph)
}
