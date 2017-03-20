import StateMachine from '../StateMachine';
import noop from '../utils/noop';

export default class BaseState<Context> {

  execute(input: mixed, context: Context, sm: StateMachine<Context>): Promise<mixed> {
    noop(input, context, sm);
    return Promise.resolve(input);
  }
}
