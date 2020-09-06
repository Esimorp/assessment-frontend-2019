import React from 'react'
import {Store} from "simple-redux";

interface StoreContext {
    store: Store
}

const {Provider, Consumer} = React.createContext({});
export {
    Provider,
    Consumer, StoreContext
}
