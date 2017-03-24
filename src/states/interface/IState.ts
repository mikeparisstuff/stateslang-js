import IPassState from './IPassState'
import IParallelState from './IParallelState'
import IChoiceState from './IChoiceState'
import IFailState from './IFailState'
import ISuccessState from './ISuccessState'
import ITaskState from './ITaskState'
import IWaitState from './IWaitState'

type IState = ITaskState
  | ISuccessState
  | IFailState
  | IChoiceState
  | IParallelState
  | IPassState
  | IWaitState

export default IState
