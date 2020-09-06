import React from 'react'
import {connect} from "react-simple-redux";
import {useForm} from "react-hook-form";

function CreateIncident({createIncident}) {
    const {register, handleSubmit} = useForm();
    const onSubmit = data => createIncident({...data, id: Date.now()});

    return (
        <div className="form-group">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="input-title">Incident Title</label>
                    <input className="sm-12" placeholder="what happened" id="input-title" name="title" ref={register({required: true})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="input-assignee">Incident Assignee</label>
                    <input className="sm-6" placeholder="want who to care" id="input-assignee" name="assignee"
                           ref={register({required: true})}/>
                </div>

                <div className="form-group">
                    <label htmlFor="input-select">Incident Status</label>
                    <select id="input-select" name="status" ref={register}>
                        <option value="New">New</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In progress">In progress</option>
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                <input type="submit"/>
            </form>
        </div>
    );
}

const CreateIncidentComponent = connect((state) => {

}, (actionWrappers) => {
    return {createIncident: actionWrappers.Incident.createIncidentAsync}
})(CreateIncident);
export {CreateIncidentComponent as CreateIncident}

