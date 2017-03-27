/**
 * https://docs.aws.amazon.com/step-functions/latest/dg/awl-ref-errors.html#awl-ref-retrying-after-error
 */
interface IRetrier {

  /**
   * A non-empty array of Strings that match Error Names. When a state reports an error, Step
   * Functions scans through the IRetriers and, when the Error Name appears in this array, it
   * implements the retry policy described in this IRetrier. [Required]
   *
   * Predefined Error Codes:
   * - States.ALL: A wild-card that matches any Error Name.
   * - States.Timeout: A Task state either ran longer than the "TimeoutSeconds" value, or failed to send a heartbeat for a time longer than the "HeartbeatSeconds" value.
   * - States.TaskFailed: A Task state failed during the execution.
   * - States.Permissions: A Task state failed because it had insufficient privileges to execute the specified code.
   */
  ErrorEquals: string[]

  /**
   * An integer that represents the number of seconds before the first retry attempt (default 1).
   * [Optional]
   */
  IntervalSeconds?: number

  /**
   * A positive integer, representing the maximum number of retry attempts (default 3). If the error
   * recurs more times than specified, retries cease and normal error handling resumes. A value of 0
   * is permitted and indicates that the error or errors should never be retried. [Optional]
   */
  MaxAttempts?: number

  /**
   * A number that is the multiplier by which the retry interval increases on each attempt
   * (default 2.0). [Optional]
   */
  BackoffRate?: number
}

export default IRetrier
