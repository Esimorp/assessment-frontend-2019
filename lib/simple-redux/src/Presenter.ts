import {State} from './State'
import {Reducer} from "./Reducer";
import {Effect} from "./Effect";

type Presenter = {
    state: State
    reducers: Record<string, Reducer>
    effects: Record<string, Effect>
}

function createPresenter(initState: State = {}, reducers: Record<string, Reducer> = {}, effects: Record<string, Effect> = {}): Presenter {
    return {
        state: initState,
        reducers,
        effects
    }
}

export {createPresenter, Presenter}
