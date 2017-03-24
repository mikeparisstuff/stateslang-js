import IFailState from './interface/IFailState'
import IExecutable from './interface/IExecutable'
import StateError from './StateError'
import BaseState from './BaseState'
const debug = require('debug')('FailState')

export default class FailState<Context> extends BaseState<Context> implements IExecutable<Context> {

  public Type: 'Fail'

  public Cause: string

  public Error: string

  constructor(name: string, state: IFailState) {
    super(name)
    Object.assign(this, state)
  }

  public execute(): Promise<mixed> {
    debug(`FailState '${this.Name}' hit with cause '${this.Cause}' and error: '${this.Error}'`)
    return Promise.reject(new StateError(this.Cause, this.Error))
  }
}
