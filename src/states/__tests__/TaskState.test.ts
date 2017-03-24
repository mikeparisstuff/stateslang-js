import IStateMachine from '../interface/IStateMachine'
import StateMachine from '../../StateMachine'
import noop from '../../utils/noop';

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
      ReturnWorld(input: mixed, context: BlankObject): Promise<mixed> {
        noop(input, context)
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
      ReturnWorld(input: mixed, context: { Hello: 'World' }): Promise<mixed> {
        noop(input)
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
