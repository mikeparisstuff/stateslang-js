import WaitState from '../WaitState'

type BlankObject = {}
it('should run the state machine and get the value after 3 seconds', async () => {
  const wait = new WaitState<BlankObject>({
    Name: 'Wait',
    Seconds: 1,
    End: true,
  })
  const start = Date.now()
  const result = await wait.execute('value', {})
  const end = Date.now()
  expect(result).toBe('value')
  expect(end - start).toBeGreaterThan(900)
})

it('should run the state machine and get the value after 3 seconds', async () => {
  const wait = new WaitState<BlankObject>({
    Name: 'Wait',
    SecondsPath: '$.Seconds',
    End: true,
  })
  const start = Date.now()
  const result = await wait.execute({
    Seconds: 1,
  }, {})
  const end = Date.now()
  expect(result).toMatchObject({
    Seconds: 1,
  })
  expect(end - start).toBeGreaterThan(900)
})

it('should run the state machine and get the value after 3 seconds', async () => {
  const oneSFromNow = new Date(Date.now() + 1000)
  const wait = new WaitState<BlankObject>({
    Name: 'Wait',
    Timestamp: oneSFromNow.toISOString(),
    End: true,
  })
  const start = Date.now()
  const result = await wait.execute({
    Timestamp: oneSFromNow,
  }, {})
  const end = Date.now()
  expect(result).toMatchObject({
    Timestamp: oneSFromNow,
  })
  expect(end - start).toBeGreaterThan(900)
})
