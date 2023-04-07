import fs from 'node:fs'
import { EOL } from 'node:os'
import { randomUUID } from 'node:crypto'
import { toCommandValue } from './command.js'

export function issueFileCommand(command, message) {
  const filePath = process.env[`GITHUB_${command}`]
  if (!filePath) throw new Error(`Unable to find environment variable for file command ${command}`)
  if (!fs.existsSync(filePath)) throw new Error(`Missing file at path: ${filePath}`)

  fs.appendFileSync(filePath, `${toCommandValue(message)}${EOL}`, { encoding: 'utf8' })
}

export function prepareKeyValueMessage(key, value) {
  const delimiter = `ghadelimiter_${randomUUID()}`
  const convertedValue = toCommandValue(value)
  return `${key}<<${delimiter}${EOL}${convertedValue}${EOL}${delimiter}`
}
