import IBaseState from './IBaseState';

/**
 * https://docs.aws.amazon.com/step-functions/latest/dg/awl-ref-states-choice.html
 *
 * A Choice state ("Type": "Choice") adds branching logic to a state machine.
 */
interface IChoiceState extends IBaseState {

  Type: 'Choice';

  /**
   * An array of Choice Rules that determine which state the state machine transitions to next.
   * [Required]
   */
  Choices: ChoiceRule[];

  /**
   * The name of a state to transition to if none of the transitions in Choices is taken.
   * [Optional, but recommended]
   */
  Default: string;
}

/**
 * A Choice state must have a Choices field whose value is a non-empty array, each element of
 * which is a object called a Choice Rule. A Choice Rule contains a comparison (two fields that
 * specify an input variable to be compared, the type of comparison and the value with which to
 * compare it) and a Next field, whose value must match a state name in the state machine.
 */
export interface ChoiceRule extends ChoiceRuleCondition {

  Next: string;

}

interface ChoiceRuleCondition extends ChoiceRuleOperators {

  Variable: string;

}

/**
 * For each of these operators, the corresponding value must be of the appropriate type: String,
 * number, boolean, or Timestamp (see below). Step Functions will not attempt to match a numeric
 * field to a string value. However, since Timestamp fields are logically strings, it is possible
 * that a field that is thought of as a time-stamp could be matched by a "StringEquals" comparator.
 */
interface ChoiceRuleOperators {

  StringEquals?: string;

  StringLessThan?: string;

  StringGreaterThan?: string;

  StringLessThanEquals?: string;

  StringGreaterThanEquals?: string;

  NumericEquals?: number;

  NumericLessThan?: number;

  NumericGreaterThan?: number;

  NumericLessThanEquals?: number;

  NumericGreaterThanEquals?: number;

  BooleanEquals?: boolean;

  TimestampEquals?: Timestamp;

  TimestampLessThan?: Timestamp;

  TimestampGreaterThan?: Timestamp;

  TimestampLessThanEquals?: Timestamp;

  TimestampGreaterThanEquals?: Timestamp;

  And?: ChoiceRuleCondition[];

  Or?: ChoiceRuleCondition[];

  Not?: ChoiceRuleCondition[];
}

export default IChoiceState;