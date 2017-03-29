class AssertionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AssertionError'
  }
}

export default function assert(value: mixed, message: string): void {
  if (!value) throw new AssertionError(message)
}
