import FailState from './states/FailState'
import PassState from './states/PassState'
import ParallelState from './states/ParallelState'
import SuccessState from './states/SuccessState'
import TaskState from './states/TaskState'
import WaitState from './states/WaitState'
import ChoiceState from './states/ChoiceState'
import BaseState from './states/BaseState'
import StateMachineError from './StateMachineError'

import IStateMachine from './states/interface/IStateMachine'
import ResourceFn from './ResourceFn'

import IState from './states/interface/IState'

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
    this.States = Object.keys(options.stateMachine.States).reduce((acc: any, key: string) => ({
      ...acc,
      [key]: this.makeState(key, options.stateMachine.States[key]),
    }), {})
    this.makeTransitions()
  }

  private makeState(name: string, state: IState): BaseState<Context> {
    switch (state.Type) {
      case 'Task':
        const resource = this.options.resources[state.Resource]
        if (!resource) {
          throw new StateMachineError(`StateMachine expected a resource named '${state.Resource}'`)
        }
        return new TaskState<Context>(name, state, resource)
      case 'Pass':
        return new PassState<Context>(name, state)
      case 'Fail':
        return new FailState<Context>(name, state)
      case 'Succeed':
        return new SuccessState<Context>(name, state)
      case 'Parallel':
        return new ParallelState<Context>(name, state)
      case 'Wait':
        return new WaitState<Context>(name, state)
      case 'Choice':
        return new ChoiceState<Context>(name, state)
      default:
        throw new StateMachineError('Invalid state type')
    }
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
          if (state.Next) {
            const next = this.getState(state.Next)
            state.setNextState(next)
          }
          break
        case 'Choice':
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
