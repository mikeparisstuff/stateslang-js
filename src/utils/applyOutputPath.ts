const get = require('lodash.get');

/**
 * https://docs.aws.amazon.com/step-functions/latest/dg/awl-ref-filters.html
 */
export default function applyOutputPath(
  result: mixed,
  path: string | undefined | null
) {
  let outputPath = path;
  // If the path is null return the input
  if (path === null) return {};
  // If the path is undefined (i.e. omitted) default to $
  if (path === undefined) { outputPath = '$'; }
  const wrappedInput = {
    '$': result,
  };
  return get(wrappedInput, outputPath);
}