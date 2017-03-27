import BaseState from './BaseState'
import {
  applyInputPath,
  applyOutputPath,
  applyResultPath,
  resolveThunk,
} from '../utils'
import StateError from './StateError';

type PassStateConfig<Context> = {
  Name: string;
  Next?: Thunk<BaseState<Context>>;
  End?: boolean;
  Comment?: string;
  InputPath?: string;
  OutputPath?: string;
  ResultPath?: string;
  Result?: mixed;
}
export default class PassState<Context> extends BaseState<Context> {

  public Type: 'Pass'

  public Next?: Thunk<BaseState<Context>>;

  public End?: boolean

  public Comment?: string

  public InputPath?: string

  public OutputPath?: string

  public Result?: mixed

  public ResultPath?: string

  constructor(config: PassStateConfig<Context>) {
    if (!config.End && !config.Next) {
      throw new StateError(
        'Invalid PassState',
        'PassStates require either End to be set or a Next state',
      )
    }
    super(config.Name)
    this.Type = 'Pass'
    this.Next = config.Next
    this.End = config.End
    this.Comment = config.Comment
    this.InputPath = config.InputPath
    this.OutputPath = config.OutputPath
    this.ResultPath = config.ResultPath
    this.Result = config.Result
  }

  public execute(input: mixed, context: Context): Promise<mixed> {
    const filteredInput = applyInputPath(input, this.InputPath)
    const filteredResult = applyResultPath(filteredInput, this.Result, this.ResultPath)
    const filteredOutput = applyOutputPath(filteredResult, this.OutputPath)
    if (this.End) {
      return Promise.resolve(filteredOutput)
    }
    const next = resolveThunk(this.Next!)
    return next.execute(filteredOutput, context)
  }
}
