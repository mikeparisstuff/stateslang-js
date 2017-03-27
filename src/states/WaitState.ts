import BaseState from './BaseState'
import { applyInputPath, resolveThunk } from '../utils'
import StateError from './StateError';
const debug = require('debug')('WaitState')

type WaitStateConfig<Context> = {
  Name: string;
  Next?: Thunk<BaseState<Context>>;
  End?: boolean;
  Comment?: string;
  InputPath?: string;
  OutputPath?: string;
  Seconds?: number;
  Timestamp?: Timestamp;
  SecondsPath?: string;
  TimestampPath?: string;
}
export default class WaitState<Context> extends BaseState<Context> {

  public Type: 'Wait'

  public Next?: Thunk<BaseState<Context>>;

  public End?: boolean

  public Comment?: string

  public InputPath?: string

  public OutputPath?: string

  public Seconds?: number

  public Timestamp?: Timestamp

  public SecondsPath?: string

  public TimestampPath?: string

  constructor(config: WaitStateConfig<Context>) {
    if (!config.End && !config.Next) {
      throw new StateError(
        'Invalid WaitState',
        'WaitStates require either End to be set or a Next state',
      )
    }
    super(config.Name)
    this.Next = config.Next
    this.End = config.End
    this.Comment = config.Comment
    this.InputPath = config.InputPath
    this.OutputPath = config.OutputPath
    this.Seconds = config.Seconds
    this.Timestamp = config.Timestamp
    this.SecondsPath = config.SecondsPath
    this.TimestampPath = config.TimestampPath
  }

  private getTimeout(input: mixed) {
    if (this.Seconds) {
      return this.Seconds * 1000
    }
    if (this.Timestamp) {
      const waitTill = new Date(this.Timestamp)
      return waitTill.getTime() - Date.now()
    }
    if (this.SecondsPath) {
      return applyInputPath(input, this.SecondsPath) as number * 1000
    }
    if (this.TimestampPath) {
      const waitTillTimestamp = applyInputPath(input, this.TimestampPath) as string
      const waitTill = new Date(waitTillTimestamp)
      return waitTill.getTime() - Date.now()
    }
    throw new Error('Could not parse duration for wait state')
  }

  public async execute(input: mixed, context: Context): Promise<mixed> {
    const waittime = this.getTimeout(input)
    const that = this
    debug(`WaitState waiting for ${waittime} ms`)
    return new Promise<mixed>(
      (
        resolve: (value?: mixed | PromiseLike<mixed> | undefined) => void,
        reject: (reason?: mixed) => void,
      ) => {
        setTimeout(() => {
          try {
            if (that.End) {
              return resolve(input)
            }
            const next = resolveThunk(that.Next!)
            return resolve(next.execute(input, context))
          } catch (e) {
            reject(e)
          }
        }, waittime)
      })
  }
}
