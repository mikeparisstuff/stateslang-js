import IRetrier from './interface/IRetrier'

export default class Retrier implements IRetrier {

  public ErrorEquals: string[]

  public IntervalSeconds?: number

  public MaxAttempts?: number

  public BackoffRate?: number

  constructor(retrier: IRetrier) {
    Object.assign(this, retrier)
  }
}
