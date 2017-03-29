import PassState from '../PassState'

type BlankObject = {}
it('should run the state machine and transform the value through pass', async () => {
  const pass = new PassState<BlankObject>({
    Name: 'Pass',
    Result: 'World',
    ResultPath: '$.Hello',
    End: true,
  })
  const result = await pass.execute({}, {})
  expect(result).toMatchObject({
    Hello: 'World',
  })
})
