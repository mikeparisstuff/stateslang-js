import runRuleCondition from '../runRuleCondition'

/**
 * Strings
 */
it('Should check string equals', () => {
  expect(runRuleCondition('StringEquals', 'a', 'a')).toBeTruthy()
})

it('Should check string ===', () => {
  expect(runRuleCondition('StringEquals', 'a', 'b')).toBeFalsy()
})

it('Should check string gt 1', () => {
  expect(runRuleCondition('StringGreaterThan', 'b', 'a')).toBeTruthy()
})

it('Should check string gt 2', () => {
  expect(runRuleCondition('StringGreaterThan', 'a', 'b')).toBeFalsy()
})

it('Should check string gte 1', () => {
  expect(runRuleCondition('StringGreaterThanEquals', 'a', 'a')).toBeTruthy()
})

it('Should check string gte 2', () => {
  expect(runRuleCondition('StringGreaterThanEquals', 'b', 'a')).toBeTruthy()
})

it('Should check string gte 3', () => {
  expect(runRuleCondition('StringGreaterThanEquals', 'a', 'b')).toBeFalsy()
})

it('Should check string lt 1', () => {
  expect(runRuleCondition('StringLessThan', 'a', 'b')).toBeTruthy()
})

it('Should check string lt 2', () => {
  expect(runRuleCondition('StringLessThan', 'b', 'a')).toBeFalsy()
})

it('Should check string lte 1', () => {
  expect(runRuleCondition('StringLessThanEquals', 'a', 'a')).toBeTruthy()
})

it('Should check string lte 2', () => {
  expect(runRuleCondition('StringLessThanEquals', 'a', 'b')).toBeTruthy()
})

it('Should check string lte 3', () => {
  expect(runRuleCondition('StringLessThanEquals', 'b', 'a')).toBeFalsy()
})

it('Should throw with equals and number', () => {
  expect(runRuleCondition('StringEquals', 'a', 2)).toThrow()
})

/**
 * Numerics
 */
it('Should check string equals', () => {
  expect(runRuleCondition('NumericEquals', 1, 1)).toBeTruthy()
})

it('Should check Numeric ===', () => {
  expect(runRuleCondition('NumericEquals', 1, 2)).toBeFalsy()
})

it('Should check Numeric gt 1', () => {
  expect(runRuleCondition('NumericGreaterThan', 2, 1)).toBeTruthy()
})

it('Should check Numeric gt 2', () => {
  expect(runRuleCondition('NumericGreaterThan', 1, 2)).toBeFalsy()
})

it('Should check Numeric gte 1', () => {
  expect(runRuleCondition('NumericGreaterThanEquals', 1, 1)).toBeTruthy()
})

it('Should check Numeric gte 2', () => {
  expect(runRuleCondition('NumericGreaterThanEquals', 2, 1)).toBeTruthy()
})

it('Should check Numeric gte 3', () => {
  expect(runRuleCondition('NumericGreaterThanEquals', 1, 2)).toBeFalsy()
})

it('Should check Numeric lt 1', () => {
  expect(runRuleCondition('NumericLessThan', 1, 2)).toBeTruthy()
})

it('Should check Numeric lt 2', () => {
  expect(runRuleCondition('NumericLessThan', 2, 1)).toBeFalsy()
})

it('Should check Numeric lte 1', () => {
  expect(runRuleCondition('NumericLessThanEquals', 1, 1)).toBeTruthy()
})

it('Should check Numeric lte 2', () => {
  expect(runRuleCondition('NumericLessThanEquals', 1, 2)).toBeTruthy()
})

it('Should check Numeric lte 3', () => {
  expect(runRuleCondition('NumericLessThanEquals', 2, 1)).toBeFalsy()
})

it('Should throw with equals and number', () => {
  expect(runRuleCondition('NumericEquals', 1, 'a')).toThrow()
})

/**
 * Timestamp
 */
const time1 = '2017-01-01T12:00:00.000Z'
const time2 = '2017-01-02T12:00:00.000Z'

it('Should check string equals', () => {
  expect(runRuleCondition('TimestampEquals', time1, time1)).toBeTruthy()
})

it('Should check Timestamp ===', () => {
  expect(runRuleCondition('TimestampEquals', time1, time2)).toBeFalsy()
})

it('Should check Timestamp gt 1', () => {
  expect(runRuleCondition('TimestampGreaterThan', time2, time1)).toBeTruthy()
})

it('Should check Timestamp gt 2', () => {
  expect(runRuleCondition('TimestampGreaterThan', time1, time2)).toBeFalsy()
})

it('Should check Timestamp gte 1', () => {
  expect(runRuleCondition('TimestampGreaterThanEquals', time1, time1)).toBeTruthy()
})

it('Should check Timestamp gte 2', () => {
  expect(runRuleCondition('TimestampGreaterThanEquals', time2, time1)).toBeTruthy()
})

it('Should check Timestamp gte 3', () => {
  expect(runRuleCondition('TimestampGreaterThanEquals', time1, time2)).toBeFalsy()
})

it('Should check Timestamp lt 1', () => {
  expect(runRuleCondition('TimestampLessThan', time1, time2)).toBeTruthy()
})

it('Should check Timestamp lt 2', () => {
  expect(runRuleCondition('TimestampLessThan', time2, time1)).toBeFalsy()
})

it('Should check Timestamp lte 1', () => {
  expect(runRuleCondition('TimestampLessThanEquals', time1, time1)).toBeTruthy()
})

it('Should check Timestamp lte 2', () => {
  expect(runRuleCondition('TimestampLessThanEquals', time1, time2)).toBeTruthy()
})

it('Should check Timestamp lte 3', () => {
  expect(runRuleCondition('TimestampLessThanEquals', time2, time1)).toBeFalsy()
})

/**
 * Boolean
 */
it('Should check Boolean ===', () => {
  expect(runRuleCondition('BooleanEquals', true, true)).toBeTruthy()
})

it('Should check Boolean ===', () => {
  expect(runRuleCondition('BooleanEquals', true, false)).toBeFalsy()
})
