import applyResultPath from '../applyResultPath'

test('should set & pull out value', () => {
  const applied = applyResultPath(
    { Hello: 'World' },
    'Universe',
    '$.Result',
  )
  expect(applied).toMatchObject({
    Hello: 'World',
    Result: 'Universe',
  })
})

test('should overwrite input with $ path', () => {
  const applied = applyResultPath(
    { Hello: 'World' },
    'Universe',
    '$',
  )
  expect(applied).toBe('Universe')
})

test('should pass through input with null path', () => {
  const applied = applyResultPath(
    { Hello: 'World' },
    'Universe',
    null,
  )
  expect(applied).toMatchObject({
    Hello: 'World',
  })
})

test('should pull out Universe', () => {
  const applied = applyResultPath(
    { Hello: 'World' },
    'Universe',
    undefined,
  )
  expect(applied).toBe('Universe')
})
