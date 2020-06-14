import {ADD_ORIENTATION} from "../actions/orientation-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

const initialState = [];

export function orientationReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ORIENTATION:
            let add = false;
            let newState = state.map(o => {
                if(o.id === action.data.id && o.name === action.data.name) {
                    add = true;
                    return action.data;
                }
                return o;
            });
            if(add) {
                return newState;
            } else {
                return [
                    ...state,
                    action.data
                ];
            }
        case SET_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}
