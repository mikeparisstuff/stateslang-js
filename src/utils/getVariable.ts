import { lensPath, view } from 'ramda'

export default function getVariable(
  input: mixed,
  path = '',
): mixed {
  const wrappedInput = {
    $: input,
  }
  return view(lensPath(path.split('.')), wrappedInput)
}
