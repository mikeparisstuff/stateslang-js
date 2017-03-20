import IRetrier from './interface/IRetrier';

export default class Retrier implements IRetrier {

  ErrorEquals: string[];

  IntervalSeconds?: number;

  MaxAttempts?: number;

  BackoffRate?: number;

  constructor(retrier: IRetrier) {
    Object.assign(this, retrier);
  }
}
