import FailState from './states/FailState';
import PassState from './states/PassState';
import ParallelState from './states/ParallelState';
import SuccessState from './states/SuccessState';
import TaskState from './states/TaskState';
import WaitState from './states/WaitState';
import BaseState from './states/BaseState';

import IState from './states/interface/IState';

import StateMachine from './StateMachine';

export default function StateFactory<Context>(stateMachine: StateMachine<Context>, state: IState) : BaseState<Context> {
  switch(state.Type) {
    case 'Task':
      return new TaskState<Context>(stateMachine, state);
    case 'Pass':
      return new PassState<Context>(stateMachine, state);
    case 'Fail':
      return new FailState<Context>(stateMachine, state);
    case 'Succeed':
      return new SuccessState<Context>(stateMachine);
    case 'Parallel':
      return new ParallelState<Context>(stateMachine, state);
    case 'Wait':
      return new WaitState<Context>(stateMachine, state);
    default:
      throw new Error(`Invalid state type: ${state.Type}`);
  }
}