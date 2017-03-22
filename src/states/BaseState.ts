import StateMachine from '../StateMachine'
import noop from '../utils/noop'

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

  public End?: boolean

  public Comment?: string

  constructor(
    protected stateMachine: StateMachine<Context>
  ) {}

  public execute(input: mixed, context: Context): Promise<mixed> {
    noop(input, context)
    return Promise.resolve(input)
  }

  protected gotoNextState(input: mixed, context: Context): Promise<mixed> {
    if (this.End) {
      return Promise.resolve(input)
    }
    const next = this.stateMachine.getState(this.Next!)
    return next.execute(input, context)
  }
}
