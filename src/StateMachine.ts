import BaseState from './states/BaseState'
import IStateMachine from './states/interface/IStateMachine'
import StateFactory from './StateFactory'
import ResourceFn from './ResourceFn'
const debug = require('debug')('StateMachine')

interface StateMachineOptions<Context> {
  stateMachine: IStateMachine
  context: Context
  resources: {
    [resource: string]: ResourceFn<Context>,
  }
}

export default class StateMachine<Context> {

  public Comment?: string

  public StartAt: string

  public TimeoutSeconds?: number

  public Version?: string

  public States: {
    [name: string]: BaseState<Context>,
  }

  public context: Context

  public resources: {
    [resource: string]: ResourceFn<Context>,
  }

  constructor({ stateMachine, context, resources }: StateMachineOptions<Context>) {
    this.context = context
    this.resources = resources
    this.Comment = stateMachine.Comment
    this.StartAt = stateMachine.StartAt
    this.TimeoutSeconds = stateMachine.TimeoutSeconds
    this.Version = stateMachine.Version
    const factory = new StateFactory({
      stateMachine,
      resources,
    });
    this.States = Object.keys(stateMachine.States).reduce((
      acc: {[name: string]: BaseState<Context>},
      key: string
    ) => ({
      ...acc,
      [key]: factory.getState(key),
    }), {})
  }

  public getResource(resource: string): ResourceFn<Context> {
    if (!this.resources[resource]) {
      throw new Error(`State machine does not contain a resource with name: ${resource}`)
    }
    return this.resources[resource]
  }

  public getState(state: string): BaseState<Context> {
    if (!this.States[state]) {
      throw new Error(`State machine does not contain a State with name: ${state}`)
    }
    return this.States[state]
  }

  public validate(): boolean {
    debug('Validating State Machine', this)
    return true;
  }

  public execute(input: mixed): Promise<mixed> {
    debug('Executing State Machine')
    const first = this.States[this.StartAt]
    return first.execute(input, this.context)
  }
}
