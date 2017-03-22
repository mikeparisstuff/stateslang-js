import IStateMachine from '../interface/IStateMachine'
import StateMachine from '../../StateMachine'

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
