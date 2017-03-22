import ITaskState from './interface/ITaskState'
import IRetrier from './interface/IRetrier'
import Catcher from './interface/ICatcher'
import BaseState from './BaseState'
import StateMachine from '../StateMachine'
import {
  applyInputPath,
  applyOutputPath,
  applyResultPath
} from '../utils'

export default class TaskState<Context> extends BaseState<Context> implements ITaskState {

  public Type: 'Task'

  public Next?: string

  public End?: boolean

  public Comment?: string

  public Resource: string

  public InputPath?: string

  public OutputPath?: string

  public ResultPath?: string

  public Retry?: IRetrier[]

  public Catch?: Catcher[]

  public TimeoutSeconds?: number

  public HeartbeatSeconds?: number

  constructor(stateMachine: StateMachine<Context>, state: ITaskState) {
    super(stateMachine)
    Object.assign(this, state)
  }

  public async execute(input: mixed, context: Context) : Promise<mixed> {
    const filteredInput = applyInputPath(input, this.InputPath)
    const resource = this.stateMachine.getResource(this.Resource)
    const result = await resource(filteredInput, context, this.stateMachine)
    const filteredResult = applyResultPath(input, result, this.ResultPath)
    const filteredOutput = applyOutputPath(filteredResult, this.OutputPath)
    return this.gotoNextState(filteredOutput, context)
  }
}
