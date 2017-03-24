/**
 * https://docs.aws.amazon.com/step-functions/latest/dg/awl-ref-states.html
 */

interface IBaseState {

  /**
   * The state's type. Can be any of the values listed in State Types. [Required]
   */
  Type: string

  /**
   * The name of the next state that will be run when the current state finishes.
   * Some state types, such as Choice, allow multiple transition states.
   */
  Next?: string

  /**
   * Designates this state as a terminal state (it ends the execution) if set to true.
   * There can be any number of terminal states per state machine. Only one of Next or End can
   * be used in a state. Some state types, such as Choice, do not support or use the End field.
   */
  End?: boolean

  /**
   * Holds a human-readable description of the state. [Optional]
   */
  Comment?: string

  /**
   * A Path that selects a portion of the state's input to be passed to the state's task for
   * processing. If omitted, it has the value $ which designates the entire input.
   * (See Filters). [Optional]
   */
  InputPath?: string

  /**
   * A Path that selects a portion of the state's input to be passed to the state's output.
   * If omitted, it has the value $ which designates the entire input. (See Filters. ) [Optional]
   */
  OutputPath?: string
}

export default IBaseState
