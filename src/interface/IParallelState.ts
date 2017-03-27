import ICatcher from './ICatcher'
import IRetrier from './IRetrier'
import IStateMachine from './IStateMachine'

/**
 * https://docs.aws.amazon.com/step-functions/latest/dg/awl-ref-states-parallel.html
 *
 * The Parallel state ("Type": "Parallel") can be used to create parallel branches of execution
 * in your state machine.
 */
interface IParallelState {

  Type: 'Parallel'

  /**
   * An array of objects that specify state machines to execute in parallel. Each such state machine
   * object must have fields named States and StartAt whose meanings are exactly like those in the
   * top level of a state machine. [Required]
   */
  Branches: IStateMachine[]

  /**
   * Specifies where (in the input) to place the output of the branches. The input is then filtered
   * as prescribed by the OutputPath field (if present) before being used as the state's output.
   * (See Paths) [Optional]
   */
  ResultPath?: string

  /**
   * An array of objects, called IRetriers that define a retry policy in case the state encounters
   * runtime errors. See Retrying After an Error. [Optional]
   */
  Retry?: IRetrier[]

  /**
   * An array of objects, called ICatchers that define a fallback state which is executed in case
   * the state encounters runtime errors and its retry policy has been exhausted or is not defined.
   * See Fallback States. [Optional]
   */
  Catch?: ICatcher[]
}

export default IParallelState
