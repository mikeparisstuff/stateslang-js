import IStateMachine from '../interface/IStateMachine';
import StateMachine from '../../StateMachine';

it('should run the state machine and get the value after 3 seconds', async () => {
  const waitMachine: IStateMachine = {
    StartAt: 'Wait',
    States: {
      Wait: {
        Type: 'Wait',
        Next: 'Done',
        Seconds: 3,
      },
      Done: {
        Type: 'Succeed',
      },
    },
  }
  const e = new StateMachine({
    stateMachine: waitMachine,
    resources: {},
    context: {},
  })
  const start = Date.now()
  const result = await e.execute('value')
  const end = Date.now()
  expect(result).toBe('value')
  expect(end - start).toBeGreaterThan(2999)
})

it('should run the state machine and get the value after 3 seconds', async () => {
  const waitPathMachine: IStateMachine = {
    StartAt: 'Wait',
    States: {
      Wait: {
        Type: 'Wait',
        Next: 'Done',
        SecondsPath: '$.Seconds',
      },
      Done: {
        Type: 'Succeed',
      },
    },
  }
  const e = new StateMachine({
    stateMachine: waitPathMachine,
    resources: {},
    context: {},
  })
  const start = Date.now()
  const result = await e.execute({
    Seconds: 3,
  })
  const end = Date.now()
  expect(result).toMatchObject({
    Seconds: 3,
  })
  expect(end - start).toBeGreaterThan(2999)
})

it('should run the state machine and get the value after 3 seconds', async () => {
  const threeSecondsFromNow = new Date(Date.now() + 3000)
  const waitTimestampMachine: IStateMachine = {
    StartAt: 'Wait',
    States: {
      Wait: {
        Type: 'Wait',
        Next: 'Done',
        Timestamp: threeSecondsFromNow.toISOString(),
      },
      Done: {
        Type: 'Succeed',
      },
    },
  }
  const e = new StateMachine({
    stateMachine: waitTimestampMachine,
    resources: {},
    context: {},
  })
  const start = Date.now()
  const result = await e.execute({
    Timestamp: threeSecondsFromNow,
  })
  const end = Date.now()
  expect(result).toMatchObject({
    Timestamp: threeSecondsFromNow,
  })
  expect(end - start).toBeGreaterThan(2999)
})
