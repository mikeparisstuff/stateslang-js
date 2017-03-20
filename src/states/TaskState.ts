import ITaskState from './interface/ITaskState';
import IRetrier from './interface/IRetrier';
import Catcher from './interface/ICatcher';
import BaseState from './BaseState';
import StateMachine from '../StateMachine';
import {
  applyInputPath,
  applyOutputPath,
  applyResultPath
} from '../utils';

export default class TaskState<Context> extends BaseState<Context> implements ITaskState {

  Type: 'Task';

  Next?: string;

  End?: boolean;

  Comment?: string;

  Resource: string;

  InputPath?: string;

  OutputPath?: string;

  ResultPath?: string;

  Retry?: IRetrier[];

  Catch?: Catcher[];

  TimeoutSeconds?: number;

  HeartbeatSeconds?: number;

  constructor(state: ITaskState) {
    super();
    Object.assign(this, state);
  }

  async execute(input: mixed, context: Context, sm: StateMachine<Context>) : Promise<mixed> {
    const filteredInput = applyInputPath(input, this.InputPath);
    const resource = sm!.getResource(this.Resource);
    const result = await resource(filteredInput, context, sm);
    const filteredResult = applyResultPath(input, result, this.ResultPath);
    const filteredOutput = applyOutputPath(filteredResult, this.OutputPath);
    return filteredOutput;
  }
}
