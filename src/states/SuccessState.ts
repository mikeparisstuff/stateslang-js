import BaseState from './BaseState'
import StateMachine from '../StateMachine'
import noop from '../utils/noop'
const debug = require('debug')('SuccessState')

export default class SuccessState<Context> extends BaseState<Context> {

  public Type: 'Succeed'

  constructor(stateMachine: StateMachine<Context>) {
    super(stateMachine)
  }

  public execute(input: mixed, context: Context): Promise<mixed> {
    debug('Reached success state')
    noop(context)
    return Promise.resolve(input)
  }
}
