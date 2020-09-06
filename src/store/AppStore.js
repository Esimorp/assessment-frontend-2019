import {createStore} from "simple-redux";
import {IncidentPresenter} from "../presenters/IncidentPresenter";

const AppStore = createStore({IncidentPresenter})

export {AppStore}