import ITaskState from './interface/ITaskState'
import IRetrier from './interface/IRetrier'
import Catcher from './interface/ICatcher'
import BaseState from './BaseState'
import ResourceFn from '../ResourceFn'
import StateError from './StateError'
import {
  applyInputPath,
  applyOutputPath,
  applyResultPath
} from '../utils'

export default class TaskState<Context> extends BaseState<Context> {

  public Type: 'Task'

  public Next?: string

  protected NextState?: BaseState<Context>

  public End?: boolean

  public Comment?: string

  public Resource: string

  private ResourceFn: ResourceFn<Context>

  public InputPath?: string

  public OutputPath?: string

  public ResultPath?: string

  public Retry?: IRetrier[]

  public Catch?: Catcher[]

  public TimeoutSeconds?: number

  public HeartbeatSeconds?: number

  constructor(name: string, state: ITaskState, resource: ResourceFn<Context>) {
    super(name)
    Object.assign(this, state)
    this.ResourceFn = resource
  }

  public async execute(input: mixed, context: Context): Promise<mixed> {
    if (!this.End && !this.NextState) {
      throw new StateError(
        'InvalidTaskState',
        'Task states must either be terminal or have a next state',
      )
    }
    const filteredInput = applyInputPath(input, this.InputPath)
    const result = await this.ResourceFn(filteredInput, context)
    const filteredResult = applyResultPath(input, result, this.ResultPath)
    const filteredOutput = applyOutputPath(filteredResult, this.OutputPath)
    return this.gotoNextState(filteredOutput, context)
  }
}
