"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = void 0;
var Action_1 = require("./Action");
function createStore(presenters) {
    var dispatch = function (action) {
        var namespace = action.type.split('/')[0];
        var type = action.type.split('/')[1];
        var namespaceState = this.state[namespace];
        this.state[namespace] = this.reducers[namespace][type](namespaceState, action.payload);
        this.notifyStateChange();
    };
    var reducers = {};
    var state = {};
    var presenterNamespaces = Object.keys(presenters);
    var actionCreators = {};
    var effects = {};
    for (var _i = 0, presenterNamespaces_1 = presenterNamespaces; _i < presenterNamespaces_1.length; _i++) {
        var n = presenterNamespaces_1[_i];
        state[n] = presenters[n].state;
        actionCreators[n] = {};
        reducers[n] = {};
        effects[n] = {};
        var namespacedReducerKeys = Object.keys(presenters[n].reducers);
        for (var _a = 0, namespacedReducerKeys_1 = namespacedReducerKeys; _a < namespacedReducerKeys_1.length; _a++) {
            var reducerKey = namespacedReducerKeys_1[_a];
            actionCreators[n][reducerKey] = Action_1.createActionCreator(n, reducerKey);
            reducers[n][reducerKey] = presenters[n].reducers[reducerKey];
        }
        var namespacedEffectKeys = Object.keys(presenters[n].effects);
        for (var _b = 0, namespacedEffectKeys_1 = namespacedEffectKeys; _b < namespacedEffectKeys_1.length; _b++) {
            var effectKey = namespacedEffectKeys_1[_b];
            effects[n][effectKey] = presenters[n].effects[effectKey];
        }
    }
    var store = {
        listeners: [],
        state: state,
        reducers: reducers,
        dispatch: dispatch,
        actionCreators: actionCreators,
        actionWrapper: {},
        effects: effects,
        getState: function () {
            return this.state;
        },
        subscribe: function (listener) {
            this.listeners.push(listener);
        },
        notifyStateChange: function () {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener();
            }
        },
        wrapActions: function () {
            var namespaces = Object.keys(this.actionCreators);
            var _loop_1 = function (n) {
                var namespacedActionCreatorKeys = Object.keys(this_1.actionCreators[n]);
                this_1.actionWrapper[n] = {};
                for (var _i = 0, namespacedActionCreatorKeys_1 = namespacedActionCreatorKeys; _i < namespacedActionCreatorKeys_1.length; _i++) {
                    var key = namespacedActionCreatorKeys_1[_i];
                    this_1.actionWrapper[n][key] = function (actionCreator, store) {
                        return function (payload) {
                            store.dispatch(actionCreator(payload));
                        };
                    }(this_1.actionCreators[n][key], this_1);
                }
                var namespacedEffectKeys = Object.keys(this_1.effects[n]);
                var _loop_2 = function (key) {
                    this_1.actionWrapper[n][key] = function (store) {
                        return function (payload) {
                            store.effects[n][key](payload, store.actionWrapper[n]);
                        };
                    }(this_1);
                };
                for (var _a = 0, namespacedEffectKeys_2 = namespacedEffectKeys; _a < namespacedEffectKeys_2.length; _a++) {
                    var key = namespacedEffectKeys_2[_a];
                    _loop_2(key);
                }
            };
            var this_1 = this;
            for (var _i = 0, namespaces_1 = namespaces; _i < namespaces_1.length; _i++) {
                var n = namespaces_1[_i];
                _loop_1(n);
            }
        }
    };
    store.wrapActions();
    return store;
}
exports.createStore = createStore;
//# sourceMappingURL=Store.js.map