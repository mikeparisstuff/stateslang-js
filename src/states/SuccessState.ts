import BaseState from './BaseState'

type SuccessStateConfig = {
  Name: string;
}
export default class SuccessState<Context> extends BaseState<Context> {

  public Type: 'Succeed'

  constructor(config: SuccessStateConfig) {
    super(config.Name)
    this.Type = 'Succeed'
  }

  public execute(input: mixed): Promise<mixed> {
    return Promise.resolve(input)
  }
}
