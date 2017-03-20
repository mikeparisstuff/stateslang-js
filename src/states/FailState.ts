import IFailState from './interface/IFailState';
import IExecutable from './interface/IExecutable';
import StateError from './StateError';

export default class FailState<Context> implements IFailState, IExecutable<Context> {

  Type: 'Fail';

  Next?: string;

  End?: boolean;

  Comment?: string;

  InputPath?: string;

  OutputPath?: string;

  Cause: string;

  Error: string;

  constructor(state: IFailState) {
    Object.assign(this, state);
  }

  execute(): Promise<mixed> {
    throw new StateError(this.Cause, this.Error);
  }
}