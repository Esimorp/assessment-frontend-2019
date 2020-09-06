import React, {Component} from 'react'
import {Provider} from './Context'
import {Store} from "simple-redux";

interface ProviderProps {
    store: Store
}

class ProviderComponent extends Component<ProviderProps> {
    render() {
        return (
            <Provider value={this.props.store}>
                {this.props.children}
            </Provider>
        )
    }
}

export {ProviderComponent}
