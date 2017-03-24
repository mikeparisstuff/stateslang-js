import BaseState from './BaseState'
import ISuccessState from './interface/ISuccessState'
import noop from '../utils/noop'

export default class SuccessState<Context> extends BaseState<Context> {

  public Type: 'Succeed'

  constructor(name: string, state: ISuccessState) {
    super(name)
    Object.assign(this, state)
  }

  public execute(input: mixed, context: Context): Promise<mixed> {
    noop(context)
    return Promise.resolve(input)
  }
}
