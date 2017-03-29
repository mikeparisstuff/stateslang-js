import IStateMachine from './IStateMachine'

type ExecutionFn<Context> = (input: mixed, context: Context, sm: IStateMachine) => Promise<mixed>
type ExecutionFn1<Context> = (input: mixed, context: Context) => Promise<mixed>
type ExecutionFn2 = (input: mixed) => Promise<mixed>
type ExecutionFn3 = () => Promise<mixed>
interface IExecutable<Context> {
  execute: ExecutionFn<Context> | ExecutionFn1<Context> | ExecutionFn2 | ExecutionFn3
}
export default IExecutable
