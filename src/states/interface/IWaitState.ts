import IBaseState from './IBaseState';

/**
 * https://docs.aws.amazon.com/step-functions/latest/dg/awl-ref-states-wait.html
 *
 * A Wait state ("Type": "Wait") delays the state machine from continuing for a specified time.
 * You can choose either a relative time, specified in seconds from when the state begins, or an
 * absolute end-time, specified as a timestamp.
 */
interface IWaitState extends IBaseState {

  Type: 'Wait';

  /**
   * A time, in seconds, to wait before beginning the state specified in the Next field.
   */
  Seconds?: number;

  /**
   * An absolute time to wait until before beginning the state specified in the Next field.
   * This string must conform to the RFC3339 profile of ISO 8601, with the further restrictions
   * that an uppercase "T" must be used to separate the date and time portions, and an uppercase
   * "Z" must be used if no numeric time zone offset is present, e.g. "2016-08-18T17:33:00Z".
   */
  Timestamp?: Timestamp;

  /**
   * A time, in seconds, to wait before beginning the state specified in the Next field,
   * specified using a path from the state's input data.
   */
  SecondsPath?: string;

  /**
   * An absolute time to wait until before beginning the state specified in the Next field,
   * specified using a path from the state's input data.
   */
  TimestampPath?: string;
}

export default IWaitState;
