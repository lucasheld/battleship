import {SET_MODE} from "../actions/mode-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

const initialState = -1;

export function modeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MODE:
            return action.data;
        case SET_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}
