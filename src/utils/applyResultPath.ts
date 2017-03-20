const set = require('lodash.set');

/**
 * https://docs.aws.amazon.com/step-functions/latest/dg/awl-ref-filters.html
 */
export default function applyResultPath(
  input: mixed,
  result: mixed,
  path: string | undefined | null
) {
  let resultPath = path;
  // If the path is null return the input
  if (path === null) return input;
  // If the path is undefined (i.e. omitted) default to $
  if (path === undefined) { resultPath = '$'; }
  const wrappedInput = {
    '$': input,
  };
  return set(wrappedInput, resultPath, result);
}