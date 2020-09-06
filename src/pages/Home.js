import React from 'react'
import {Incident} from '../components/Incident'
import {connect} from "react-simple-redux";

class Home extends React.Component {
    render() {
        return <div>
            {this.props.incidents.map(item => <Incident key={item.id} title={item.title} assignee={item.assignee} status={item.status} />)}
        </div>;
    }
}

const H = connect((state) => {
    return {
        incidents: state.Incident
    }
}, (actionWrappers) => {
    return {
        deleteById: actionWrappers.Incident.deleteIncidentByIdAsync
    }
})(Home)
export {H as Home}
