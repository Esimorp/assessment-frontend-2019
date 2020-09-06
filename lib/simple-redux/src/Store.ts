import {Presenter} from "./Presenter";
import {State} from "./State";
import {Reducer} from "./Reducer";
import {Action, ActionCreator, createActionCreator} from "./Action";
import {Effect} from "./Effect";

type DispatchAction = (payload: unknown) => void;
type Dispatch = (this: Store, action: Action) => void;

interface Store {
    state: Record<string, State>
    reducers: Record<string, Record<string, Reducer>>
    dispatch: (action: Action) => State
    actionCreators: Record<string, Record<string, ActionCreator>>
    actionWrapper: Record<string, Record<string, DispatchAction>>
    effects: Record<string, Record<string, Effect>>
    getState: () => Record<string, State>
    wrapActions: () => void
}

function createStore(presenters: Record<string, Presenter>): Store {
    const dispatch: Dispatch = function (this: Store, action: Action) {
        const namespace = action.type.split('/')[0];
        const type = action.type.split('/')[1];
        const namespaceState = this.state[namespace];
        this.state[namespace] = this.reducers[namespace][type](namespaceState, action.payload);
    }

    const reducers: Record<string, Record<string, Reducer>> = {};

    const state: Record<string, State> = {}
    const presenterNamespaces = Object.keys(presenters);

    const actionCreators: Record<string, Record<string, ActionCreator>> = {};
    const effects: Record<string, Record<string, Effect>> = {};


    for (const n of presenterNamespaces) {
        state[n] = presenters[n].state;

        actionCreators[n] = {};
        reducers[n] = {};
        effects[n] = {};

        const namespacedReducerKeys = Object.keys(presenters[n].reducers);
        for (const reducerKey of namespacedReducerKeys) {
            actionCreators[n][reducerKey] = createActionCreator(n, reducerKey);
            reducers[n][reducerKey] = presenters[n].reducers[reducerKey];
        }

        const namespacedEffectKeys = Object.keys(presenters[n].effects);
        for (const effectKey of namespacedEffectKeys) {
            effects[n][effectKey] = presenters[n].effects[effectKey];
        }
    }


    const store: Store = {
        state, reducers: reducers,
        dispatch: dispatch,
        actionCreators,
        actionWrapper: {},
        effects,
        getState: function (this: Store) {
            return this.state
        },
        wrapActions: function (this: Store) {
            const namespaces = Object.keys(this.actionCreators);
            for (const n of namespaces) {
                const namespacedActionCreatorKeys = Object.keys(this.actionCreators[n]);
                this.actionWrapper[n] = {}
                for (const key of namespacedActionCreatorKeys) {
                    this.actionWrapper[n][key] = function (actionCreator: ActionCreator, store: Store) {
                        return function (payload: unknown) {
                            store.dispatch(actionCreator(payload))
                        }
                    }(this.actionCreators[n][key], this)
                }

                const namespacedEffectKeys = Object.keys(this.effects[n]);
                for (const key of namespacedEffectKeys) {
                    this.actionWrapper[n][key] = function (store: Store) {
                        return function (payload: unknown) {
                            store.effects[n][key](payload, store.actionWrapper[n])
                        }
                    }(this)
                }
            }
        }
    }
    store.wrapActions();
    return store;
}

export {createStore, DispatchAction};
