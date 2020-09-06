/// <reference types="react" />
declare type MapStateToPropsFunction = (state: Record<string, Record<string, unknown>>) => Record<string, unknown>;
declare type MapActionWrapperToPropsFunction = (actionWrappers: Record<string, Record<string, unknown>>) => Record<string, unknown>;
declare function connect(mapStateToProps: MapStateToPropsFunction, mapActionWrapperToProps: MapActionWrapperToPropsFunction): (WrapComponent: any) => (props: any) => JSX.Element;
export { connect };
//# sourceMappingURL=connect.d.ts.map