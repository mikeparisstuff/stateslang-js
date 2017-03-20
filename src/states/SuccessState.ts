import BaseState from './BaseState';
import StateMachine from '../StateMachine';
import noop from '../utils/noop';

export default class SuccessState<Context> extends BaseState<Context> {

  Type: 'Succeed';

  execute(input: mixed, context: Context, sm: StateMachine<Context>): Promise<mixed> {
    noop(input, context, sm);
    return Promise.resolve(input);
  }
}
