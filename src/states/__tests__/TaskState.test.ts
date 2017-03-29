import TaskState from '../TaskState'
import noop from '../../utils/noop'

type BlankObject = {}
it('should run the state machine and transform the value through task', async () => {
  const task = new TaskState<BlankObject>({
    Name: 'State',
    Resource(): Promise<mixed> {
      return Promise.resolve({ Hello: 'World' })
    },
    End: true,
  })
  const result = await task.execute({}, {})
  expect(result).toMatchObject({
    Hello: 'World',
  })
})

type HelloWorld = { Hello: 'World' }
it('should run the task state and grab the value from context', async () => {
  const task = new TaskState<HelloWorld>({
    Name: 'State',
    Resource(input: mixed, context: HelloWorld): Promise<string> {
      noop(input)
      return Promise.resolve(context.Hello)
    },
    End: true,
  })
  const result = await task.execute({}, { Hello: 'World'})
  expect(result).toBe('World')
})
