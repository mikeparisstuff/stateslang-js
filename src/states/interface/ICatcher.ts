/**
 * https://docs.aws.amazon.com/step-functions/latest/dg/awl-ref-errors.html#awl-ref-fallback-states
 */
interface ICatcher {

  /**
   * A non-empty array of Strings that match Error Names, specified exactly as with the Retrier
   * field of the same name. [Required]
   */
  ErrorEquals: string[]

  /**
   * A string which must exactly match one of the state machine's state names. [Required]
   */
  Next: string

  /**
   * A path which determines what is sent as input to the state specified by the Next field.
   * [Optional]
   */
  ResultPath?: string
}

export default ICatcher
