interface Action {
    type: string,
    payload: unknown
}

type ActionCreator = (payload: unknown) => Action

function createActionCreator(namespace: string, type: string): ActionCreator {
    return (payload: unknown): Action => {
        return {type: '', payload}
    }
}

export {Action, ActionCreator, createActionCreator}
