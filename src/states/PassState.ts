import IPassState from './interface/IPassState';
import BaseState from './BaseState';
import {
  applyInputPath,
  applyOutputPath,
  applyResultPath,
} from '../utils';

export default class PassState<Context> extends BaseState<Context> implements IPassState {

  Type: 'Pass';

  Next?: string;

  End?: boolean;

  Comment?: string;

  InputPath?: string;

  OutputPath?: string;

  Result?: any;

  ResultPath?: string;

  constructor(state: IPassState) {
    super();
    Object.assign(this, state);
  }

  execute(input: mixed) : Promise<mixed> {
    const filteredInput = applyInputPath(input, this.InputPath);
    const filteredResult = applyResultPath(filteredInput, this.Result, this.ResultPath);
    const filteredOutput = applyOutputPath(filteredResult, this.OutputPath);
    return filteredOutput;
  }
}
