import {createStore} from "simple-redux";
import {IncidentPresenter} from "../presenters/IncidentPresenter";
import {LoadingPresenter} from "../presenters/LoadingPresenter";

const AppStore = createStore({Incident: IncidentPresenter, Loading: LoadingPresenter})

export {AppStore}
