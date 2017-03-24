import IChoiceState, { ChoiceRule } from './interface/IChoiceState'
import BaseState from './BaseState'
// import assert from '../utils/assert'
// import getVariable from '../utils/getVariable';

// function executeOperator(rule: RuleOperator, variable: mixed, value: mixed) {
//   switch(rule) {
//     case 'StringEquals':
//       assert(typeof value === 'string', 'StringEquals requires a value with type string');
//       return variable === value;
//     case 'StringLessThan':
//       assert(typeof value === 'string', 'StringLessThan requires a value with type string');
//       return variable! < value!
//     case 'StringGreaterThan':
//       assert(typeof value === 'string', 'StringGreaterThan requires a value with type string');
//       return variable! > value!
//     case 'StringGreaterThanEquals':
//       assert(typeof value === 'string', 'StringGreaterThanEquals requires a value with type string');
//       return variable! >= value!
//     default:
//       return false
//   }

// }

// function executeChoice(rule: ChoiceRule, input: mixeds): boolean {
//   const value = getVariable(input, rule.Variable)
// }

export default class ChoiceState<Context>
  extends BaseState<Context> {

  public Type: 'Choice'

  public Next?: string

  public End?: boolean

  public Comment?: string

  public InputPath?: string

  public OutputPath?: string

  public Choices: ChoiceRule[]

  public Default: string

  constructor(name: string, state: IChoiceState) {
    super(name)
    Object.assign(this, state)
  }

  public execute(input: mixed): Promise<mixed> {
    return Promise.resolve(input)
  }
}
