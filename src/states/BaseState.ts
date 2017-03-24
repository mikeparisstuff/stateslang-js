import noop from '../utils/noop'
import StateError from './StateError';

type StateType = 'Pass'
  | 'Wait'
  | 'Task'
  | 'Choice'
  | 'Fail'
  | 'Parallel'
  | 'Succeed'

export default class BaseState<Context> {

  public Type: StateType

  public Next?: string

  protected NextState?: BaseState<Context>

  public End?: boolean

  public Comment?: string

  constructor(public Name: string) {}

  public execute(input: mixed, context: Context): Promise<mixed> {
    noop(input, context)
    return Promise.resolve(input)
  }

  public setNextState(state: BaseState<Context>): void {
    this.NextState = state
  }

  protected gotoNextState(input: mixed, context: Context): Promise<mixed> {
    if (this.End) {
      return Promise.resolve(input)
    }
    if (this.NextState) {
      return this.NextState.execute(input, context)
    }
    throw new StateError(
      'InvalidState',
      'State must either be terminal or have a next state',
    )
  }
}
