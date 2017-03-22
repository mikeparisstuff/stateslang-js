import applyInputPath from '../applyInputPath';

it('should pull out World', () => {
  const applied = applyInputPath({ Hello: 'World' }, '$.Hello');
  expect(applied).toBe('World');
});

it('should pull out nested World', () => {
  const applied = applyInputPath({ Hello: { Good: 'World' } }, '$.Hello.Good');
  expect(applied).toBe('World');
});

it('should grab the whole object', () => {
  const applied = applyInputPath({ Hello: 'World' }, '$');
  expect(applied.Hello).toBe('World');
})

it('should overwrite with {}', () => {
  const applied = applyInputPath({ Hello: 'World' }, null);
  expect(applied.Hello).toBe(undefined);
})

it('should grab the whole object', () => {
  const applied = applyInputPath({ Hello: 'World' }, undefined);
  expect(applied.Hello).toBe('World');
})