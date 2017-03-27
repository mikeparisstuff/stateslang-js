import { lensPath, view } from 'ramda'

export default function getVariable(
  input: mixed,
  path = '',
) {
  const wrappedInput = {
    $: input,
  }
  return view(lensPath(path.split('.')), wrappedInput)
}
