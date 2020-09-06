import {createPresenter} from "simple-redux"

const initState = [{
    id: Date.now(),
    title: "Test incident",
    assignee: "Admin",
    status: "Resolved"
}];

const reducers = {
    createIncident: (state, payload) => {
        state.push(payload);
        return state;
    },
    deleteIncidentById: (state, payload) => {
        return state.filter((incident => incident.id !== payload))
    },
    modifyIncidentById: (state, payload) => {
        for (let i = 0; i < state.length; i++) {
            if (state[i].id === payload.id) {
                state[i] = {...payload}
            }
        }
        return state;
    }
};

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const effects = {
    createIncidentAsync: async (payload, actionWrapper) => {
        await timeout(200);
        actionWrapper.Incident.createIncident(payload)
    },
    deleteIncidentByIdAsync: async (payload, actionWrapper) => {
        await timeout(200);
        actionWrapper.Incident.deleteIncidentById(payload)
    },
    modifyIncidentByIdAsync: async (payload, actionWrapper) => {
        await timeout(200);
        actionWrapper.Incident.modifyIncidentById(payload)
    },
};

const IncidentPresenter = createPresenter(initState, reducers, effects)

export {IncidentPresenter}
