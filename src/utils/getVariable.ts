const get = require('lodash.get')

export default function getVariable(
  input: mixed,
  path: string | undefined | null,
) {
  const wrappedInput = {
    $: input,
  }
  return get(wrappedInput, path, null)
}
