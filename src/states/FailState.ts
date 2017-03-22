import IFailState from './interface/IFailState';
import IExecutable from './interface/IExecutable';
import StateError from './StateError';
import BaseState from './BaseState';
import StateMachine from '../StateMachine';

export default class FailState<Context> extends BaseState<Context> implements IFailState, IExecutable<Context> {

  public Type: 'Fail'

  public Next?: string

  public End?: boolean

  public Comment?: string

  public InputPath?: string

  public OutputPath?: string

  public Cause: string

  public Error: string

  constructor(stateMachine: StateMachine<Context>, state: IFailState) {
    super(stateMachine)
    Object.assign(this, state)
  }

  execute(): Promise<mixed> {
    return Promise.reject(new StateError(this.Cause, this.Error))
  }
}
