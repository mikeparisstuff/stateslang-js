class StateError extends Error {

  cause: string;

  constructor(cause: string, error: string) {
    super(error);
    this.name = 'StateError';
    this.cause = cause;
  }
}

export default StateError;
