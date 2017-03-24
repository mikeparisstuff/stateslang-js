import IBaseState from './IBaseState'

/**
 * https://docs.aws.amazon.com/step-functions/latest/dg/awl-ref-states-fail.html
 *
 * A Fail state ("Type": "Fail") stops the execution of the state machine and marks it as a failure.
 *
 * The Fail state only allows the use of Type and Comment fields from the set of common state
 * fields. Because Fail states always exit the state machine, they have no Next field nor do they
 * require an End field.
 */
interface IFailState extends IBaseState {

  Type: 'Fail'

  /**
   * Provides a custom failure string that can be used for operational or diagnostic purposes.
   * [Optional]
   */
  Cause: string

  /**
   * Provides an error name that can be used for error handling (Retry/Catch),
   * operational or diagnostic purposes. [Optional]
   */
  Error: string
}

export default IFailState
