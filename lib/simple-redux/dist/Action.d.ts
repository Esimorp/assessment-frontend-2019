interface Action {
    type: string;
    payload: unknown;
}
declare type ActionCreator = (payload: unknown) => Action;
declare function createActionCreator(namespace: string, type: string): ActionCreator;
export { Action, ActionCreator, createActionCreator };
//# sourceMappingURL=Action.d.ts.map