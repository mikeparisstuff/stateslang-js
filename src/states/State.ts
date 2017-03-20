import PassState from './PassState';
import ParallelState from './ParallelState';
import ChoiceState from './ChoiceState';
import FailState from './FailState';
import SuccessState from './SuccessState';
import TaskState from './TaskState';
import WaitState from './WaitState';

type State<Context> =
  TaskState<Context> |
  SuccessState<Context> |
  FailState<Context> |
  ChoiceState<Context> |
  ParallelState<Context> |
  PassState<Context> |
  WaitState<Context>;

export default State;
