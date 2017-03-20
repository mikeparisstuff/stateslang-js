import BaseState from './states/BaseState';
import IStateMachine from './states/interface/IStateMachine';
import StateFactory from './StateFactory';
import ResourceFn from './ResourceFn';
const debug = require('debug')('StateMachine');

interface StateMachineOptions<Context> {
  stateMachine: IStateMachine;
  context: Context;
  resources: {
    [resource: string]: ResourceFn<Context>;
  };
}

export default class StateMachine<Context> {

  Comment?: string;

  StartAt: string;

  TimeoutSeconds?: number;

  Version?: string;

  States: {
    [name: string]: BaseState<Context>;
  };

  context: Context;

  resources: {
    [resource: string]: ResourceFn<Context>;
  };

  constructor({ stateMachine, context, resources }: StateMachineOptions<Context>) {
    this.context = context;
    this.resources = resources;
    this.Comment = stateMachine.Comment;
    this.StartAt = stateMachine.StartAt;
    this.TimeoutSeconds = stateMachine.TimeoutSeconds;
    this.Version = stateMachine.Version;
    this.States = Object.keys(stateMachine.States).reduce((acc: any, key: string) => ({
      ...acc,
      [key]: StateFactory<Context>(stateMachine.States[key])
    }), {});
  }

  getResource(resource: string) {
    if (!this.resources[resource]) {
      throw new Error(`State machine does not contain a resource with name: ${resource}`);
    }
    return this.resources[resource];
  }

  validate() {
    debug('Validating State Machine', this);
  }

  execute(input: mixed) : Promise<mixed> {
    debug('Executing State Machine with input: ', input);
    const first = this.States[this.StartAt];
    return first.execute(input, this.context, this);
  }
}
