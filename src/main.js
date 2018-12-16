import { performance as perf } from 'perf_hooks'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import chalk from 'chalk'
require('dotenv').config()

const run = async (year, day, part) => {
    const dayBase = path.join(__dirname, year, `day${day}`)
    const dayModule = require(path.join(dayBase, `day${day}.js`))
    const inputPath = path.join(dayBase, `day${day}`)

    if (!fs.existsSync(inputPath)) {
        const d = day.startsWith('0') ? day.substring(1) : day
        const res = await fetch(`http://adventofcode.com/${year}/day/${d}/input`, {
            headers: {
                Cookie: `session=${process.env.SESSION}`,
            },
        })

        if (res.status !== 200) {
            throw Error(`Unable to fetch input. Status: ${res.status}`)
        }

        const input = await res.text()
        fs.writeFileSync(inputPath, input)
    }

    const start = perf.now()

    const input = fs.readFileSync(inputPath, 'utf-8').replace(/\n$/, '')
    const answer = await dayModule[`solvePart${part}`](input)

    return {
        answer: JSON.stringify(answer),
        time: perf.now() - start,
    }
}

run(process.argv[2], process.argv[3], process.argv[4])
    .then(({ answer, time }) => {
        console.log(`>>> ${chalk.red(answer)} <<< in ${chalk.green(`${time.toFixed(2)}ms`)}`)
    })
    .catch(e => console.error(e))
