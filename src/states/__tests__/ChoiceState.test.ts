import ChoiceState, { ChoiceRule } from '../ChoiceState'
import TaskState from '../TaskState'

type BlankObject = {}

const task1 = new TaskState<BlankObject>({
  Name: 'State1',
  Resource(): Promise<mixed> {
    return Promise.resolve({ Hello: 'Task1' })
  },
  End: true,
})
const task2 = new TaskState<BlankObject>({
  Name: 'State2',
  Resource(): Promise<mixed> {
    return Promise.resolve({ Hello: 'Task2' })
  },
  End: true,
})
const defTask = new TaskState<BlankObject>({
  Name: 'DefState',
  Resource(): Promise<mixed> {
    return Promise.resolve({ Hello: 'Default' })
  },
  End: true,
})
const rule1 = new ChoiceRule<BlankObject>({
  Next: task1,
  Variable: '$.option',
  StringEquals: 'option1',
})
const rule2 = new ChoiceRule<BlankObject>({
  Next: () => task2,
  Variable: '$.option',
  StringEquals: 'option2',
})

it('should run the state machine and transform the value through task', async () => {
  const choiceState = new ChoiceState<BlankObject>({
    Name: 'ChoiceState',
    Choices: [rule1, rule2],
    Default: defTask
  })

  const result = await choiceState.execute({ option: 'option1' }, {})
  expect(result).toMatchObject({
    Hello: 'Task1',
  })
})

it('should run the state machine and transform the value through task', async () => {
  const choiceState = new ChoiceState<BlankObject>({
    Name: 'ChoiceState',
    Choices: [rule1, rule2],
    Default: defTask
  })

  const result = await choiceState.execute({ option: 'option2' }, {})
  expect(result).toMatchObject({
    Hello: 'Task2',
  })
})

it('should run the state machine and transform the value through task', async () => {
  const choiceState = new ChoiceState<BlankObject>({
    Name: 'ChoiceState',
    Choices: [rule1, rule2],
    Default: defTask
  })

  const result = await choiceState.execute({ option: 'option3' }, {})
  expect(result).toMatchObject({
    Hello: 'Default',
  })
})

it('should run the state machine and transform the value through task', async () => {
  const choiceState = new ChoiceState<BlankObject>({
    Name: 'ChoiceState',
    Choices: [rule1, rule2],
    Default: defTask,
    InputPath: '$.nested',
  })

  const result = await choiceState.execute({ nested: { option: 'option1' } }, {})
  expect(result).toMatchObject({
    Hello: 'Task1',
  })
})
