import IRetrier from '../interface/IRetrier'
import Catcher from '../interface/ICatcher'
import BaseState from './BaseState'
import ResourceFn from '../ResourceFn'
import StateError from './StateError'
import resolveThunk from '../utils/resolveThunk'
import {
  applyInputPath,
  applyOutputPath,
  applyResultPath,
} from '../utils'

type TaskStateConfig<Context> = {
  Name: string;
  Resource: ResourceFn<Context>;
  Next?: Thunk<BaseState<Context>>;
  End?: boolean;
  Comment?: string;
  InputPath?: string;
  OutputPath?: string;
  ResultPath?: string;
  // Retry?: Retrier[];
  // Catch?: Catcher[];
  TimeoutSeconds?: number;
  HeartbeatSeconds?: number;
}
export default class TaskState<Context> extends BaseState<Context> {

  public Type: 'Task'

  public Resource: ResourceFn<Context>

  public Next?: Thunk<BaseState<Context>>

  public End?: boolean

  public Comment?: string

  public InputPath?: string

  public OutputPath?: string

  public ResultPath?: string

  public Retry?: IRetrier[]

  public Catch?: Catcher[]

  public TimeoutSeconds?: number

  public HeartbeatSeconds?: number

  constructor(config: TaskStateConfig<Context>) {
    if (!config.End && !config.Next) {
      throw new StateError(
        'Invalid TaskState',
        'TaskStates require either End to be set or a Next state',
      )
    }
    super(config.Name)
    this.Type = 'Task'
    this.Resource = config.Resource
    this.Next = config.Next
    this.End = config.End
    this.Comment = config.Comment
    this.InputPath = config.InputPath
    this.OutputPath = config.OutputPath
    this.ResultPath = config.ResultPath
    this.TimeoutSeconds = config.TimeoutSeconds
    this.HeartbeatSeconds = config.HeartbeatSeconds
  }

  public async execute(input: mixed, context: Context): Promise<mixed> {
    if (!this.End && !this.Next) {
      throw new StateError(
        'InvalidTaskState',
        'Task states must either be terminal or have a next state',
      )
    }
    const filteredInput = applyInputPath(input, this.InputPath)
    const result = await this.Resource(filteredInput, context)
    const filteredResult = applyResultPath(input, result, this.ResultPath)
    const filteredOutput = applyOutputPath(filteredResult, this.OutputPath)
    if (this.End) {
      return filteredOutput
    }
    const next = resolveThunk(this.Next!)
    return next.execute(filteredOutput, context)
  }
}
