# Simple-Redux
a simple implementation of redux , idea from rematch
## types
### Wrapped Action
```ts
const wrappedAction = (payload) => void
```
all the Reducer and Effect will be wrapped as Action when create the Store and save in `Store.actionWrapper.${namespace}` by `Store.wrapActions()` method
### Reducer
```ts
const reducer = (prevState,payload) => newState
```
a pure function recive 2 params : previous state of the Presenter it belong to,and payload. then return the new state of the Presenter. It will be wrapped as WrappedAction when createStore.

### effect
```ts
const effect = (payload,actionWrapper) => void
```
a pure function can take side effect,recive 2 params:payload,and actionWrapper, you can access **all** the wrapped actions by actionWrapper. It will be wrapped as WrappedAction when createStore.

### Presenter
```ts
const presenter = {state,reducers,effects}
```
use to hold state,reducers,effects under a namespace

### Store
```ts
interface Store {
    state: Record<string, State>
    actionWrapper: Record<string, Record<string, DispatchAction>>
}
```
use to hold namespaced Presenters, you can access Presenter state by `Store.state.${namespace}`,and you can access  wrapped Presenter reducers and effects by `Store.actionWrapper.${namespace}`

## methods

### createPresenter 
```ts
createPresenter(initState: State = {}, reducers: Record<string, Reducer> = {}, effects: Record<string, Effect> = {}): Presenter
```
* initState : Initial state to instantiate a presenter
* reducers : presenter's reducers
* effects : presenter's effects

### createStore
```ts
createStore(presenters: Record<string, Presenter>): Store
```
* presenters : a map with string key and Presenter value,the string key will be the Presenter's namespace
## example usage 

```ts
// create a presenter
const testPresenter1 = createPresenter(1,
    {
        increase: (previousState, payload) => {
            return (previousState as number) + (payload as number)
        },
        decrease: (previousState, payload) => {
            return (previousState as number) - (payload as number)
        }
    }, {
        increaseAsync: async (payload, actionWrapper) => {
            await timeout(200);
            actionWrapper.testPresenter1.increase(payload);
        }
    }
)
// use testPresenter1 create store,and give it 'ns1' namespace
const store = createStore({ns1:testPresenter1});

// then you can access presenter by store
// store.state.ns1; // 1
// store.actionWrapper.ns1.increase; // function
// store.actionWrapper.ns1.increaseAsync; // function
```

# React-Simple-redux
a simple implementation of react-redux

## component

### ProviderComponent
```jsx
    <ProviderComponent store={store}><App/></ProviderComponent>
```
use to share store with react `createContext` api

## method

### connect
```ts
const connect = (mapStateToProps,mapActionWrapperToProps)=>(Component)=>WrappedComponent
```
use to map store state and store actionWrapper to the Component you want to access store

#### mapStateToProps
```ts
const mapStateToProps = (state) => {selfPropsKey:value}
```
use to filte store states to component's props
#### mapActionWrapperToProps
```ts
const mapStateToProps = (actionWrappers) => {selfPropsKey:functionValue}
```
use to filte store actionWrappers to component's props

## example usage 
```js
//app.js
function App() {
    return (
        <ProviderComponent store={AppStore}>
            <Loading/>
            <Router>
                <Header/>
                <Route exact path="/" component={Home}/>
                <Route path="/create" component={CreateIncident}/>
            </Router>
        </ProviderComponent>
    )
}

//LoadingPresenter.js
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

//AppStore.js

import {createStore} from "simple-redux";
import {LoadingPresenter} from "../presenters/LoadingPresenter";

const AppStore = createStore({ Loading: LoadingPresenter})

export {AppStore}

//LoadingComponent.js

import React from 'react'
import {connect} from "react-simple-redux";

// the loading props will auto changed when LoadingPresenter.startLoading() and LoadingPresenter.endLoading() be called in other place

function Loading({loading}) {
    if (loading)
        return (
            <div className="loading-mask">
                <img src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif"/>
            </div>
        )
    else {
        return (<div>
        </div>)
    }
}

const L = connect((state) => {
        return {loading: state.Loading}
    },
    (actionWrappers) => {

    })(Loading)

export {L as Loading} 

```
