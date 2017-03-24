import IState from './IState'

/**
 * https://docs.aws.amazon.com/step-functions/latest/dg/awl-ref-structure.html
 *
 * State machines are defined using JSON text that represents a structure containing the following
 * fields:
 */
interface IStateMachine {

  /**
   * A human-readable description of the Istate machine. [Optional]
   */
  Comment?: string

  /**
   * A string that must exactly match (case-sensitive) the name of one of the Istate objects.
   * [Required]
   */
  StartAt: string

  /**
   * The maximum number of seconds an execution of the Istate machine may run if it runs longer
   * than the specified time, then the execution fails with an IStates.Timeout Error name. [Optional]
   */
  TimeoutSeconds?: number

  /**
   * The version of Amazon IStates Language used in the Istate machine, default is "1.0". [Optional]
   */
  Version?: string

  /**
   * This field's value is an object containing a comma-delimited set of Istates. [Required]
   */
  States: {
    [name: string]: IState
  }
}

export default IStateMachine
