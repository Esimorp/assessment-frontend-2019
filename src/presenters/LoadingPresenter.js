import {createPresenter} from "simple-redux"

const initState = false;

const reducers = {
    startLoading() {
        return true
    },
    endLoading() {
        return false
    }
};

const LoadingPresenter = createPresenter(initState, reducers, {})

export {LoadingPresenter}
