/**
 * https://docs.aws.amazon.com/step-functions/latest/dg/awl-ref-states-succeed.html
 *
 * A Succeed state ("Type": "Succeed") stops an execution successfully. The Succeed state is a
 * useful target for Choice state branches that don't do anything but stop the execution.
 */
interface ISuccessState {
  Type: 'Succeed';
}

export default ISuccessState;
