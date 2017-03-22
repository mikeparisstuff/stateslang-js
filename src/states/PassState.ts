import IPassState from './interface/IPassState'
import BaseState from './BaseState'
import StateMachine from '../StateMachine'
import {
  applyInputPath,
  applyOutputPath,
  applyResultPath,
} from '../utils'

export default class PassState<Context> extends BaseState<Context> implements IPassState {

  public Type: 'Pass'

  public Next?: string

  public End?: boolean

  public Comment?: string

  public InputPath?: string

  public OutputPath?: string

  public Result?: mixed

  public ResultPath?: string

  constructor(stateMachine: StateMachine<Context>, state: IPassState) {
    super(stateMachine)
    Object.assign(this, state)
  }

  public execute(input: mixed, context: Context): Promise<mixed> {
    const filteredInput = applyInputPath(input, this.InputPath)
    const filteredResult = applyResultPath(filteredInput, this.Result, this.ResultPath)
    const filteredOutput = applyOutputPath(filteredResult, this.OutputPath)
    return this.gotoNextState(filteredOutput, context)
  }
}
