"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPresenter = void 0;
function createPresenter(initState, reducers, effects) {
    if (initState === void 0) { initState = {}; }
    if (reducers === void 0) { reducers = {}; }
    if (effects === void 0) { effects = {}; }
    if (initState == null)
        throw Error("initState must not be null or undefined");
    if (typeof initState === 'function')
        throw Error("initState must not be function");
    if (!reducers)
        throw Error("reducers must not be null or undefined");
    if (typeof reducers !== 'object')
        throw Error("reducers must  be object");
    var reducerKeys = Object.keys(reducers);
    if (reducerKeys.length <= 0)
        throw Error("reducers must has at least one reducer");
    for (var _i = 0, reducerKeys_1 = reducerKeys; _i < reducerKeys_1.length; _i++) {
        var k = reducerKeys_1[_i];
        if (typeof reducers[k] !== 'function')
            throw Error("reducers must all be function");
    }
    var effectKeys = Object.keys(effects);
    var duplicateKeys = reducerKeys.filter(function (v) { return effectKeys.includes(v); });
    if (duplicateKeys.length > 0) {
        throw Error("there must not be any duplicate keys in reducers and effects");
    }
    return {
        state: initState,
        reducers: reducers,
        effects: effects
    };
}
exports.createPresenter = createPresenter;
//# sourceMappingURL=Presenter.js.map