import BaseState from './BaseState'
import { RuleOperator } from '../interface/IChoiceState'
import { getVariable, runRuleCondition, resolveThunk } from '../utils'
import StateError from './StateError'
import { find } from 'ramda'
import {
  applyInputPath,
  applyOutputPath,
} from '../utils'

const Operations = [
  'StringEquals',
  'StringLessThan',
  'StringGreaterThan',
  'StringLessThanEquals',
  'StringGreaterThanEquals',
  'NumericEquals',
  'NumericLessThan',
  'NumericGreaterThan',
  'NumericLessThanEquals',
  'NumericGreaterThanEquals',
  'BooleanEquals',
  'TimestampEquals',
  'TimestampLessThan',
  'TimestampGreaterThan',
  'TimestampLessThanEquals',
  'TimestampGreaterThanEquals',
]

interface RuleConditionConfig {
  Variable?: string,
  StringEquals?: string,
  StringLessThan?: string,
  StringGreaterThan?: string,
  StringLessThanEquals?: string,
  StringGreaterThanEquals?: string,
  NumericEquals?: number,
  NumericLessThan?: number,
  NumericGreaterThan?: number,
  NumericLessThanEquals?: number,
  NumericGreaterThanEquals?: number,
  BooleanEquals?: boolean,
  TimestampEquals?: Timestamp,
  TimestampLessThan?: Timestamp,
  TimestampGreaterThan?: Timestamp,
  TimestampLessThanEquals?: Timestamp,
  TimestampGreaterThanEquals?: Timestamp,
  And?: ChoiceRuleCondition[],
  Or?: ChoiceRuleCondition[],
  Not?: ChoiceRuleCondition,
}
class ChoiceRuleCondition {

  public Variable?: string
  public StringEquals?: string
  public StringLessThan?: string
  public StringGreaterThan?: string
  public StringLessThanEquals?: string
  public StringGreaterThanEquals?: string
  public NumericEquals?: number
  public NumericLessThan?: number
  public NumericGreaterThan?: number
  public NumericLessThanEquals?: number
  public NumericGreaterThanEquals?: number
  public BooleanEquals?: boolean
  public TimestampEquals?: Timestamp
  public TimestampLessThan?: Timestamp
  public TimestampGreaterThan?: Timestamp
  public TimestampLessThanEquals?: Timestamp
  public TimestampGreaterThanEquals?: Timestamp
  public And?: ChoiceRuleCondition[]
  public Or?: ChoiceRuleCondition[]
  public Not?: ChoiceRuleCondition

  constructor(
    config: RuleConditionConfig
  ) {
    Object.assign(this, config)
  }

  public operate(input: mixed): boolean {
    if (this.And) {
      return this.And.reduce(
        (acc: boolean, rule: ChoiceRuleCondition) => acc && rule.operate(input),
        true,
      )
    }
    if (this.Or) {
      return this.Or.reduce(
        (acc: boolean, rule: ChoiceRuleCondition) => acc || rule.operate(input),
        false,
      )
    }
    if (this.Not) {
      return !this.Not.operate(input)
    }
    if (!this.Variable) {
      throw new StateError(
        'Invalid ChoiceRuleCondition',
        'A ChoiceRuleCondition must have define a Variable or set And, Or, or Not',
      )
    }
    const value = getVariable(input, this.Variable)
    const that = this
    return Operations.reduce((acc: boolean, op: RuleOperator) => {
      if (that[op]) {
        return acc || runRuleCondition(op, value, that[op])
      }
      return acc
    }, false)
  }
}

interface ChoiceRuleConfig<Context> extends RuleConditionConfig {
  Next: Thunk<BaseState<Context>>
}
export class ChoiceRule<Context> extends ChoiceRuleCondition {

  public Next: Thunk<BaseState<Context>>

  constructor(
    config: ChoiceRuleConfig<Context>,
  ) {
    const { Next, ...conf } = config
    super(conf)
    this.Next = Next
  }
}

interface ChoiceStateConfig<Context> {
  Name: string
  Choices: ChoiceRule<Context>[]
  Default: Thunk<BaseState<Context>>
  Comment?: string
  InputPath?: string
  OutputPath?: string
}
export default class ChoiceState<Context>
  extends BaseState<Context> {

  public Type: 'Choice'

  public Comment?: string

  public InputPath?: string

  public OutputPath?: string

  public Choices: ChoiceRule<Context>[]

  public Default: Thunk<BaseState<Context>>

  constructor(config: ChoiceStateConfig<Context>) {
    super(config.Name)
    this.Type = 'Choice'
    this.Comment = config.Comment
    this.InputPath = config.InputPath
    this.OutputPath = config.OutputPath
    this.Choices = config.Choices
    this.Default = config.Default
  }

  /**
   * Execute the choice state.
   */
  public execute(input: mixed, context: Context): Promise<mixed> {
    const filteredInput = applyInputPath(input, this.InputPath)
    const validChoice = find(
      (choice: ChoiceRule<Context>) => choice.operate(filteredInput),
      this.Choices,
    )
    const filteredOutput = applyOutputPath(input, this.OutputPath)
    if (!validChoice) {
      const def = resolveThunk(this.Default)
      return def.execute(filteredOutput, context)
    }
    const next = resolveThunk(validChoice.Next)
    return next.execute(filteredOutput, context)
  }
}
