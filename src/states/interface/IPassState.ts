import IBaseState from './IBaseState';

/**
 * https://docs.aws.amazon.com/step-functions/latest/dg/awl-ref-states-pass.html
 *
 * A Pass state ("Type": "Pass") simply passes its input to its output, performing no work.
 * Pass states are useful when constructing and debugging state machines.
 */
interface IPassState extends IBaseState {

  Type: 'Pass';

  /**
   * Treated as the output of a virtual task to be passed on to the next state, and filtered as
   * prescribed by the ResultPath field (if present). [Optional]
   */
  Result?: any;

  /**
   * Specifies where (in the input) to place the "output" of the virtual task specified in Result.
   * The input is further filtered as prescribed by the OutputPath field (if present) before being
   * used as the state's output. (See Paths) [Optional]
   */
  ResultPath?: string;
}

export default IPassState;
