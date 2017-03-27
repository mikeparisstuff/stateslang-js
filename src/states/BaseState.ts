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

  public Next?: Thunk<BaseState<Context>>

  public End?: boolean

  public Comment?: string

  constructor(public Name: string) {}

  public execute(input: mixed, context: Context): Promise<mixed> {
    noop(input, context)
    return Promise.resolve(input)
  }
}
