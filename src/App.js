import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {CreateIncident} from './pages/CreateIncident'
import {Home} from './pages/Home'
import {Header} from './components/Header'
import {ProviderComponent} from "react-simple-redux";
import {AppStore} from "./store/AppStore";


function App() {
    return (
        <ProviderComponent store={AppStore}>
            <Router>
                <Header/>
                <Route exact path="/">
                    {props => <Home {...props} />}
                </Route>
                <Route path="/create">
                    {props => <CreateIncident {...props} />}
                </Route>
            </Router>
        </ProviderComponent>
    )
}

export default App
