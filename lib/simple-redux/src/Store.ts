import {Presenter} from "./Presenter";
import {State} from "./State";
import {Reducer} from "./Reducer";
import {Action, ActionCreator} from "./Action";
import {Effect, EffectCreator} from "./Effect";

interface Store {
    state: Record<string, State>
    reducers: Record<string, Record<string, Reducer>>
    dispatch: (action: Action) => State
    actionWrapper: Record<string, Record<string, ActionCreator>>
    effects: Record<string, Record<string, EffectCreator>>
    getState: () => Record<string, State>
}


function createStore(presenters: Record<string, Presenter>): Store {
    const state: Record<string, State> = {}
    const presenterNamespaces = Object.keys(presenters);

    for (const n of presenterNamespaces) {
        state[n] = presenters[n].state;
    }

    return {
        state, reducers: {}, dispatch: () => {
            return {}
        }, actionWrapper: {}, effects: {}, getState: () => {
            return {}
        }
    }
}

export {createStore}
