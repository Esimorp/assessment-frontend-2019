import React, {Component} from 'react'
import {connect} from "react-simple-redux";

class Incident extends Component {
    render() {
        const {title, assignee, status, id, deleteById} = this.props;

        return (
            <div className="sm-12 md-6 lg-4 col card">
                <div className="card-body">
                <div className="card-title"><h3>{title}</h3></div>
                <div className="card-text"><p><b>Assignee</b>: {assignee}</p></div>
                <div className="card-text"><p><b>Status</b>: {status}</p></div>
                <button className="btn-danger" onClick={deleteById.bind(this, id)}>Delete</button>
                </div>
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
