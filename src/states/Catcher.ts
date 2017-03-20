import ICatcher from './interface/ICatcher';

export default class Catcher implements ICatcher {

  ErrorEquals: string[];

  Next: string;

  ResultPath?: string;

  constructor(catcher: ICatcher) {
    Object.assign(this, catcher);
  }
}
