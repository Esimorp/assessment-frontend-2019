interface Action {
    type: string,
    payload: unknown
}

type ActionCreator = (payload: unknown) => Action

function createActionCreator(namespace: string, type: string): ActionCreator {
    if (!namespace)
        throw Error('namespace must not be null or undefined');

    if (!type)
        throw Error('type must not be null or undefined');

    if (typeof namespace !== 'string')
        throw Error('namespace must be string type');

    if (typeof type !== 'string')
        throw Error('type must be string type');

    return (payload: unknown): Action => {
        return {type: `${namespace}/${type}`, payload}
    }
}

export {Action, ActionCreator, createActionCreator}
