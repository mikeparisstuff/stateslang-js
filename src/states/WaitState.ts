import IWaitState from './interface/IWaitState';
import BaseState from './BaseState';
import StateMachine from '../StateMachine';
import { noop } from '../utils';

export default class WaitState<Context> extends BaseState<Context> implements IWaitState {

  Type: 'Wait';

  Next?: string;

  End?: boolean;

  Comment?: string;

  Resource: string;

  InputPath?: string;

  OutputPath?: string;

  Seconds?: number;

  Timestamp?: Timestamp;

  SecondsPath?: string;

  TimestampPath?: string;

  constructor(state: IWaitState) {
    super();
    Object.assign(this, state);
  }

  execute(input: mixed, context: Context, sm: StateMachine<Context>): Promise<mixed> {
    noop(input, context, sm);
    throw new Error('Not Implemented');
  }
}
