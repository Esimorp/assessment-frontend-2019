import { Presenter } from "./Presenter";
import { State } from "./State";
import { Reducer } from "./Reducer";
import { Action, ActionCreator } from "./Action";
import { Effect } from "./Effect";
declare type DispatchAction = (payload: unknown) => void;
interface Store {
    state: Record<string, State>;
    reducers: Record<string, Record<string, Reducer>>;
    dispatch: (action: Action) => State;
    actionCreators: Record<string, Record<string, ActionCreator>>;
    actionWrapper: Record<string, Record<string, DispatchAction>>;
    effects: Record<string, Record<string, Effect>>;
    getState: () => Record<string, State>;
    wrapActions: () => void;
}
declare function createStore(presenters: Record<string, Presenter>): Store;
export { createStore, DispatchAction };
//# sourceMappingURL=Store.d.ts.map