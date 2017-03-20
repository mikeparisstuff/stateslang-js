import StateMachine from './StateMachine';

type ResourceFn<Context> = (input: mixed, context: Context, stateMachine: StateMachine<Context>) => Promise<mixed>;

export default ResourceFn;
