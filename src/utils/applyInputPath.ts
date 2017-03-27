import { lensPath, view } from 'ramda'

export default function applyInputPath(
  input: mixed,
  path: string | undefined | null,
): mixed {
  let inputPath = path
  // If the path is null
  if (path === null) return {}
  // If the path is undefined (i.e. omitted) default to $
  if (path === undefined) { inputPath = '$' }
  const wrappedInput = {
    $: input,
  }
  const lens = lensPath(inputPath!.split('.'))
  return view(lens, wrappedInput)
}
