import FailState from './states/FailState'
import PassState from './states/PassState'
// import ParallelState from './states/ParallelState'
import SuccessState from './states/SuccessState'
import TaskState from './states/TaskState'
import WaitState from './states/WaitState'
// import ChoiceState from './states/ChoiceState'
import BaseState from './states/BaseState'
import StateMachineError from './StateMachineError'

import IStateMachine from './interface/IStateMachine'
import ResourceFn from './ResourceFn'

import IState from './interface/IState'

interface StateFactoryOptions<Context> {
  stateMachine: IStateMachine
  resources: {
    [resource: string]: ResourceFn<Context>,
  }
}

export default class StateFactory<Context> {

  private States: {
    [name: string]: BaseState<Context>;
  }

  constructor(private options: StateFactoryOptions<Context>) {
    /* tslint:disable */
    this.States = Object.keys(options.stateMachine.States).reduce((acc: any, key: string) => ({
      ...acc,
      [key]: this.makeState(key, options.stateMachine.States[key]),
    }), {})
    /* tslint:enable */
    this.makeTransitions()
  }

  private makeState(name: string, state: IState): BaseState<Context> {
    switch (state.Type) {
      case 'Task':
        const resource = this.options.resources[state.Resource]
        if (!resource) {
          throw new StateMachineError(`StateMachine expected a resource named '${state.Resource}'`)
        }
        return new TaskState<Context>({ Name: name, Resource: resource })
      case 'Pass':
        return new PassState<Context>({ Name: name })
      case 'Fail':
        return new FailState<Context>({ Name: name, Cause: state.Cause, Error: state.Error })
      case 'Succeed':
        return new SuccessState<Context>({ Name: name })
      case 'Parallel':
        // return new ParallelState<Context>({ Name: name })
      case 'Wait':
        return new WaitState<Context>({ Name: name })
      case 'Choice':
        // return new ChoiceState<Context>({ Name: name })
      default:
        throw new StateMachineError('Invalid state type')
    }
  }

  public addState(name: string, state: IState): void {
    if (this.States[name]) {
      throw new StateMachineError(`A state named '${name}' already exists`)
    }
    this.States[name] = this.makeState(name, state)
  }

  public getState(name: string): BaseState<Context> {
    const next = this.States[name]
    if (!next) {
      throw new StateMachineError(`StateMachine expected a state named '${name}'`)
    }
    return next
  }

  /**
   * After all states have been created, go through and set the next states.
   */
  private makeTransitions(): void {
    Object.keys(this.States).map((name: string) => {
      const state = this.States[name]
      if (state.End) {
        // If this is a terminal state skip
        return
      }
      switch (state.Type) {
        case 'Task':
        case 'Wait':
        case 'Pass':
          break
        case 'Choice':
          // We need to wire up ChoiceRules with their next states
          break
        case 'Parallel':
        case 'Fail':
        case 'Succeed':
          break
        default:
          throw new StateMachineError(`Invalid state type: ${state.Type}`)
      }
    })
  }

}
