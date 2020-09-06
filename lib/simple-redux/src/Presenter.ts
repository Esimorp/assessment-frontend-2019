import {State} from './State'
import {Reducer} from "./Reducer";
import {Effect} from "./Effect";

type Presenter = {
    state: State
    reducers: Record<string, Reducer>
    effects: Record<string, Effect>
}

function createPresenter(initState: State = {}, reducers: Record<string, Reducer> = {}, effects: Record<string, Effect> = {}): Presenter {
    if (initState == null)
        throw Error("initState must not be null or undefined")

    if (typeof initState === 'function')
        throw Error("initState must not be function")

    if (!reducers)
        throw Error("reducers must not be null or undefined")

    if (typeof reducers !== 'object')
        throw Error("reducers must  be object")

    const reducerKeys: string[] = Object.keys(reducers);

    if (reducerKeys.length <= 0)
        throw Error("reducers must has at least one reducer")

    for (const k of reducerKeys) {
        if (typeof reducers[k] !== 'function')
            throw Error("reducers must all be function")
    }

    const effectKeys: string[] = Object.keys(effects);

    const duplicateKeys = reducerKeys.filter(v => effectKeys.includes(v));
    if (duplicateKeys.length > 0) {
        throw Error("there must not be any duplicate keys in reducers and effects");
    }

    return {
        state: initState,
        reducers,
        effects
    }
}

export {createPresenter, Presenter}
