const get = require('lodash.get')

export default function applyInputPath(
  input: mixed,
  path: string | undefined | null
) {
  let inputPath = path
  // If the path is null
  if (path === null) return {}
  // If the path is undefined (i.e. omitted) default to $
  if (path === undefined) { inputPath = '$' }
  const wrappedInput = {
    $: input,
  }
  return get(wrappedInput, inputPath)
}
