import IStateMachine from './states/interface/IStateMachine';
import StateMachine from './StateMachine';
import 'rxjs/add/observable/of';
const debug = require('debug')('index');

const sm: IStateMachine = {
  StartAt: 'First',
  States: {
    First: {
      Type: 'Task',
      Next: 'Second',
      Resource: 'Echo'
    },
    Second: {
      Type: 'Task',
      Next: 'Third',
      Resource: 'Echo'
    },
    Third: {
      Type: 'Succeed'
    }
  }
};
debug(sm);
const e = new StateMachine({
  stateMachine: sm,
  resources: {
    Echo: (inp: any, ctxt: any, sm: any) => {
      console.log('Executing echo');
      console.log(inp);
      console.log(ctxt);
      console.log(sm);
      return Promise.resolve('hello, world');
    }
  },
  context: {
    connectors: { hello: 'world' }
  }
});
e.execute({
  input: 'value'
})
// .subscribe(
//   (value: any) => debug(value),
//   (err: Error) => debug(err),
//   () => debug('Complete'),
// );