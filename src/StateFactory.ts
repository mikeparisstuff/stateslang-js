import FailState from './states/FailState';
import PassState from './states/PassState';
import ParallelState from './states/ParallelState';
import SuccessState from './states/SuccessState';
import TaskState from './states/TaskState';
import WaitState from './states/WaitState';
import BaseState from './states/BaseState';

import IState from './states/interface/IState';

export default function StateFactory<Context>(state: IState) : BaseState<Context> {
  switch(state.Type) {
    case 'Task':
      return new TaskState<Context>(state);
    case 'Pass':
      return new PassState<Context>(state);
    case 'Fail':
      return new FailState<Context>(state);
    case 'Succeed':
      return new SuccessState<Context>();
    case 'Parallel':
      return new ParallelState<Context>(state);
    case 'Wait':
      return new WaitState<Context>(state);
    default:
      throw new Error(`Invalid state type: ${state.Type}`);
  }
}