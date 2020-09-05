import {State} from './State'

type Reducer = (previousState: State, payload: unknown) => State;

export {Reducer};
