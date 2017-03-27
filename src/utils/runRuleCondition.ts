import { RuleOperator } from '../interface/IChoiceState';

function expectString(val: mixed) {
  if (typeof val !== 'string') throw new Error('Expected value of type string')
}

function expectNumber(val: mixed) {
  if (typeof val !== 'number') throw new Error('Expected value of type number')
}

function expectBoolean(val: mixed) {
  if (typeof val !== 'boolean') throw new Error('Expected value of type boolean')
}

export default function runRuleCondition(operation: RuleOperator, value: mixed, expect: mixed): boolean {
  switch(operation) {
    case 'StringEquals':
      expectString(value)
      return expect === value
    case 'StringLessThan':
      expectString(value)
      return value! < expect!
    case 'StringGreaterThan':
      expectString(value)
      return value! > expect!
    case 'StringLessThanEquals':
      expectString(value)
      return value! <= expect!
    case 'StringGreaterThanEquals':
      expectString(value)
      return value! >= expect!
    case 'NumericEquals':
      expectNumber(value)
      return value! === expect!
    case 'NumericLessThan':
      expectNumber(value)
      return value! < expect!
    case 'NumericGreaterThan':
      expectNumber(value)
      return value! > expect!
    case 'NumericLessThanEquals':
      expectNumber(value)
      return value! <= expect!
    case 'NumericGreaterThanEquals':
      expectNumber(value)
      return value! >= expect!
    case 'BooleanEquals':
      expectBoolean(value)
      return value! === expect!
    case 'TimestampEquals':
      return new Date(value as string).getTime() === new Date(expect as string).getTime()
    case 'TimestampLessThan':
      return new Date(value as string).getTime() < new Date(expect as string).getTime()
    case 'TimestampGreaterThan':
      return new Date(value as string).getTime() > new Date(expect as string).getTime()
    case 'TimestampLessThanEquals':
      return new Date(value as string).getTime() <= new Date(expect as string).getTime()
    case 'TimestampGreaterThanEquals':
      return new Date(value as string).getTime() >= new Date(expect as string).getTime()
    default:
      return false
  }
}
