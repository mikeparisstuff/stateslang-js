import IStateMachine from '../states/interface/IStateMachine';
import StateMachine from '../StateMachine';
import { noop } from '../utils';

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
};
it('should run the state machine and get the value after 3 seconds', async () => {
  const e = new StateMachine({
    stateMachine: waitMachine,
    resources: {},
    context: {}
  });
  const start = Date.now();
  const result = await e.execute('value')
  const end = Date.now();
  expect(result).toBe('value');
  expect(end - start).toBeGreaterThan(2999);
})

const passMachine: IStateMachine = {
  StartAt: 'Pass',
  States: {
    Pass: {
      Type: 'Pass',
      Result: 'World',
      ResultPath: '$.Hello',
      Next: 'Done',
    },
    Done: {
      Type: 'Succeed',
    },
  },
}
it('should run the state machine and transform the value through pass', async () => {
  const e = new StateMachine({
    stateMachine: passMachine,
    resources: {},
    context: {},
  })
  const result = await e.execute({})
  expect(result).toMatchObject({
    Hello: 'World',
  })
})


const taskMachine: IStateMachine = {
  StartAt: 'Task',
  States: {
    Task: {
      Type: 'Task',
      ResultPath: '$.Hello',
      Resource: 'ReturnWorld',
      Next: 'Done',
    },
    Done: {
      Type: 'Succeed',
    },
  },
}
type BlankObject = {}
it('should run the state machine and transform the value through task', async () => {
  const e = new StateMachine<BlankObject>({
    stateMachine: taskMachine,
    resources: {
      ReturnWorld(input: mixed, context: BlankObject, stateMachine: StateMachine<BlankObject>) {
        noop(input, context, stateMachine)
        return Promise.resolve('World')
      },
    },
    context: {},
  })
  const result = await e.execute({})
  expect(result).toMatchObject({
    Hello: 'World',
  })
})

it('should run the state machine and grab the value through task from context', async () => {
  const e = new StateMachine<{ Hello: 'World' }>({
    stateMachine: taskMachine,
    resources: {
      ReturnWorld(input: mixed, context: { Hello: 'World' }, stateMachine: StateMachine<BlankObject>) {
        noop(input, stateMachine)
        return Promise.resolve(context.Hello)
      },
    },
    context: {
      Hello: 'World',
    },
  })
  const result = await e.execute({})
  expect(result).toMatchObject({
    Hello: 'World',
  })
})
