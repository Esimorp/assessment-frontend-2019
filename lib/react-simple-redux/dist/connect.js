"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
var react_1 = __importStar(require("react"));
var Context_1 = require("./Context");
function connect(mapStateToProps, mapActionWrapperToProps) {
    return function (WrapComponent) {
        var Proxy = /** @class */ (function (_super) {
            __extends(Proxy, _super);
            function Proxy(props) {
                var _this = _super.call(this, props) || this;
                _this.state = props.store.getState();
                _this.unsub = props.store.subscribe(function () {
                    this.setState(this.props.store.getState());
                }.bind(_this));
                return _this;
            }
            Proxy.prototype.componentWillUnmount = function () {
                this.props.store.unsubscribe(this.unsub);
            };
            Proxy.prototype.render = function () {
                var _props = Object.assign({}, this.props);
                delete _props['store'];
                return (react_1.default.createElement(WrapComponent, __assign({}, _props, mapStateToProps(this.state), mapActionWrapperToProps(this.props.store.actionWrapper))));
            };
            return Proxy;
        }(react_1.Component));
        return function (props) {
            return (react_1.default.createElement(Context_1.Consumer, null, function (value) { return react_1.default.createElement(Proxy, __assign({ store: value }, props)); }));
        };
    };
}
exports.connect = connect;
//# sourceMappingURL=connect.js.map