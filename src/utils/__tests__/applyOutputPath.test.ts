import applyOutputPath from '../applyOutputPath';

test('Should grab entire output', () => {
  const applied = applyOutputPath(
    { Hello: 'World' },
    '$.Hello'
  );
  expect(applied).toBe('World');
})

test('Should return empty object with null path', () => {
  const applied = applyOutputPath(
    { Hello: 'World' },
    null,
  );
  expect(applied).toMatchObject({});
})

test('Should return empty object with undefined path', () => {
  const applied = applyOutputPath(
    { Hello: 'World' },
    undefined,
  );
  expect(applied).toMatchObject({ Hello: 'World' });
})
