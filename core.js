import { issueCommand, issue, toCommandValue } from './command.js'
import { issueFileCommand, prepareKeyValueMessage } from './file-command.js'
import { EOL } from 'node:os'

export function getInput(name, options = {}) {
  const v = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || ''
  if (options.required && !v) throw new Error(`Input required and not supplied: ${name}`)
  return v.trim()
}

export function getMultilineInput(name, options = {}) {
  return getInput(name, options).split('\n').filter(x => x !== '').map(i => i.trim())
}

export function getBooleanInput(name, options = {}) {
  const trueValue = ['true', 'True', 'TRUE']
  const falseValue = ['false', 'False', 'FALSE']
  const v = getInput(name, options)
  if (trueValue.includes(v)) return true
  if (falseValue.includes(v)) return false
  throw new TypeError(
    `Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
      `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``
  )
}

export function setOutput(name, value) {
  const filePath = process.env['GITHUB_OUTPUT'] || ''
  if (filePath) return issueFileCommand('OUTPUT', prepareKeyValueMessage(name, value))
  process.stdout.write(EOL)
  issueCommand('set-output', { name }, toCommandValue(value))
}

const handleMessage = m => m instanceof Error ? m.toString() : m
// this is a more basic implementation of toCommandProperties in actions/toolkit
const handleProperties = props => ({
  title: props.title,
  file: props.file,
  line: props.startLine,
  endLine: props.endLine,
  col: props.startColumn,
  endColumn: props.endColumn
})
export function info(message) { process.stdout.write(message + EOL) }
export function debug(message, props = {}) { issueCommand('debug', handleProperties(props), handleMessage(message)) }
export function error(message, props = {}) { issueCommand('error', handleProperties(props), handleMessage(message)) }
export function warning(message, props = {}) { issueCommand('warning', handleProperties(props), handleMessage(message)) }
export function notice(message, props = {}) { issueCommand('notice', handleProperties(props), handleMessage(message)) }
export function setFailed(message, props = {}) {
  process.exitCode = 1
  error(message, props)
}
export function startGroup(name) { issue('group', name) }
export function endGroup() { issue('endgroup') }

