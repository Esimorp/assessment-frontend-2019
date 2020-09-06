import { State } from './State';
import { Reducer } from "./Reducer";
import { Effect } from "./Effect";
declare type Presenter = {
    state: State;
    reducers: Record<string, Reducer>;
    effects: Record<string, Effect>;
};
declare function createPresenter(initState?: State, reducers?: Record<string, Reducer>, effects?: Record<string, Effect>): Presenter;
export { createPresenter, Presenter };
//# sourceMappingURL=Presenter.d.ts.map