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
                <Route exact path="/" component={Home}/>
                <Route path="/create" component={CreateIncident}/>
            </Router>
        </ProviderComponent>
    )
}

export default App
