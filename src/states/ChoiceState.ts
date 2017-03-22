import IChoiceState, { ChoiceRule } from './interface/IChoiceState';
import BaseState from './BaseState';
import StateMachine from '../StateMachine';

export default class ChoiceState<Context>
  extends BaseState<Context>
  implements IChoiceState {

  public Type: 'Choice'

  public Next?: string

  public End?: boolean

  public Comment?: string

  public InputPath?: string

  public OutputPath?: string

  public Choices: ChoiceRule[]

  public Default: string

  constructor(stateMachine: StateMachine<Context>, state: IChoiceState) {
    super(stateMachine)
    Object.assign(this, state)
  }

  execute(input: mixed): Promise<mixed> {
    return Promise.resolve(input)
  }
}
