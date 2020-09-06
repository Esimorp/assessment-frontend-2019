import React, {Component} from 'react'
import {connect} from "react-simple-redux";

class Incident extends Component {
    render() {
        const {title, assignee, status, id, deleteById} = this.props;

        return (
            <div style={{border: '1px solid black'}}>
                <p>{title}</p>
                <p>Assignee: {assignee}</p>
                <p>Status: {status}</p>
                <button onClick={deleteById.bind(this, id)}>Delete Async</button>
            </div>
        )
    }
}

const I = connect((state) => {
    },
    (actionWrappers) => {
        return {deleteById: actionWrappers.Incident.deleteIncidentByIdAsync}
    })(Incident)

export {I as Incident}
