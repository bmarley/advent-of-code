import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const run = (year, day) => {
  const templatesBase = path.join(process.cwd(), 'templates')

  const solution = fs.readFileSync(path.join(templatesBase, 'day.js'), 'utf-8')
  const test = fs
    .readFileSync(path.join(templatesBase, 'test.js'), 'utf-8')
    .replace(/YYYY/g, year)
    .replace(/DD/g, day)

  const destinationBase = path.join(__dirname, year, `day${day}`)
  const solutionPath = path.join(destinationBase, `day${day}.js`)
  const testPath = path.join(destinationBase, `day${day}.test.js`)

  if (!fs.existsSync(destinationBase)) {
    fs.mkdirSync(destinationBase, { recursive: true })
  }

  if (!fs.existsSync(solutionPath)) {
    fs.writeFileSync(solutionPath, solution, 'utf-8')
    console.log(`Generated ${solutionPath}`)
  }

  if (!fs.existsSync(testPath)) {
    fs.writeFileSync(testPath, test, 'utf-8')
    console.log(`Generated ${testPath}`)
  }
}

run(process.argv[2], process.argv[3])
