"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActionCreator = void 0;
function createActionCreator(namespace, type) {
    if (!namespace)
        throw Error('namespace must not be null or undefined');
    if (!type)
        throw Error('type must not be null or undefined');
    if (typeof namespace !== 'string')
        throw Error('namespace must be string type');
    if (typeof type !== 'string')
        throw Error('type must be string type');
    return function (payload) {
        return { type: namespace + "/" + type, payload: payload };
    };
}
exports.createActionCreator = createActionCreator;
//# sourceMappingURL=Action.js.map