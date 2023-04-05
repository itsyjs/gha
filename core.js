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
