import IChoiceState, { ChoiceRule } from './interface/IChoiceState';
import BaseState from './BaseState';

export default class ChoiceState<Context>
  extends BaseState<Context>
  implements IChoiceState {

  Type: 'Choice';

  Next?: string;

  End?: boolean;

  Comment?: string;

  InputPath?: string;

  OutputPath?: string;

  Choices: ChoiceRule[];

  Default: string;

  constructor(state: IChoiceState) {
    super();
    Object.assign(this, state);
  }

  execute(input: mixed): Promise<mixed> {
    return Promise.resolve(input);
  }
}
