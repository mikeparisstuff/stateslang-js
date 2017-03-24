import IBaseState from './IBaseState'
import IRetrier from './IRetrier'
import ICatcher from './ICatcher'

/**
 * https://docs.aws.amazon.com/step-functions/latest/dg/awl-ref-states-task.html
 *
 * A Task state ("Type": "Task") represents a single unit of work performed by a state machine.
 */
interface TaskState extends IBaseState {

  Type: 'Task'

  /**
   * A URI, especially an Amazon Resource Name (ARN) that uniquely identifies the specific
   * task to execute. [Required]
   */
  Resource: string

  /**
   * Specifies where (in the input) to place the results of executing the task specified in
   * Resource. The input is then filtered as prescribed by the OutputPath field (if present)
   * before being used as the state's output. (See Paths) [Optional]
   */
  ResultPath?: string

  /**
   * An array of objects, called IRetriers, that define a retry policy in case the state encounters
   * runtime errors. See Retrying After an Error. [Optional]
   */
  Retry?: IRetrier[]

  /**
   * An array of objects, called ICatchers, that define a fallback state which is executed in case
   * the state encounters runtime errors and its retry policy has been exhausted or is not defined.
   * See Fallback States. [Optional]
   */
  Catch?: ICatcher[]

  /**
   * If the task runs longer than the specified seconds, then this state fails with a States.Timeout
   * Error Name. Must be a positive, non-zero integer. If not provided, the default value is
   * 99999999. [Optional]
   */
  TimeoutSeconds?: number

  /**
   * If more time than the specified seconds elapses between heartbeats from the task, then this
   * state fails with an States.Timeout Error Name. Must be a positive, non-zero integer less than
   * the number of seconds specified in the TimeoutSeconds field. If not provided, the default value
   * is 99999999. [Optional]
   */
  HeartbeatSeconds?: number
}

export default TaskState
