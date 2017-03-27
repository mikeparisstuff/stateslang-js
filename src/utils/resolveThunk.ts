export default function resolveThunk<T>(thunk: Thunk<T>): T {
  if (typeof thunk === 'function') {
    return thunk()
  }
  return thunk
}
