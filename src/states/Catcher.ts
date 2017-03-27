import ICatcher from '../interface/ICatcher'

export default class Catcher implements ICatcher {

  public ErrorEquals: string[]

  public Next: string

  public ResultPath?: string

  constructor(catcher: ICatcher) {
    Object.assign(this, catcher)
  }
}
