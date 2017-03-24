export default class StateMachineError extends Error {
  constructor(message: string) {
    super()
    this.name = 'StateMachineError'
    this.message = message
  }
}
