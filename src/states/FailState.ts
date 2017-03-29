import IExecutable from '../interface/IExecutable'
import StateError from './StateError'
import BaseState from './BaseState'

/* tslint:disable */
const debug = require('debug')('FailState')
/* tslint:enable */

type FailStateConfig = {
  Name: string;
  Cause: string;
  Error: string;
}
export default class FailState<Context> extends BaseState<Context> implements IExecutable<Context> {

  public Type: 'Fail'

  public Cause: string

  public Error: string

  constructor(config: FailStateConfig) {
    super(config.Name)
    this.Type = 'Fail'
    this.Cause = config.Cause
    this.Error = config.Error
  }

  public execute(): Promise<mixed> {
    debug(`FailState '${this.Name}' hit with cause '${this.Cause}' and error: '${this.Error}'`)
    return Promise.reject(new StateError(this.Cause, this.Error))
  }
}
