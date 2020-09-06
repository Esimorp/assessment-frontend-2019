import React from 'react'
import {Incident} from '../components/Incident'
import {connect} from "react-simple-redux";

class Home extends React.Component {
    render() {
        const{incidents} = this.props;

        return <div>
            <div>
                {incidents.map(item => <Incident key={item.id} id={item.id} title={item.title} assignee={item.assignee}
                                                            status={item.status}/>)}
            </div>

        </div>;
    }
}

const H = connect((state) => {
    return {
        incidents: state.Incident
    }
}, (actionWrappers) => {
    return {
    }
})(Home)
export {H as Home}
