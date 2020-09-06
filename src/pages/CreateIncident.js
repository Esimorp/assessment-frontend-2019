import React from 'react'
import {connect} from "react-simple-redux";
import {useForm} from "react-hook-form";

function CreateIncident({createIncident}) {
    const {register, handleSubmit} = useForm();
    const onSubmit = data => createIncident(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="title" ref={register({required: true})}/>
            <input name="assignee" ref={register({required: true})}/>
            <select name="status" ref={register}>
                <option value="New">New</option>
                <option value="Assigned">Assigned</option>
                <option value="In progress">In progress</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
            </select>
            <input type="submit"/>
        </form>
    );
}

const CreateIncidentComponent = connect((state) => {

}, (actionWrappers) => {
    return {createIncident: actionWrappers.Incident.createIncidentAsync}
})(CreateIncident);
export {CreateIncidentComponent as CreateIncident}

