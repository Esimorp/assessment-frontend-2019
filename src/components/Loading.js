import React from 'react'
import {connect} from "react-simple-redux";

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


