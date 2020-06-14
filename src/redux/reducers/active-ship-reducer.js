import {SET_ACTIVE_SHIP} from "../actions/active-ship-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

const initialState = null;

export function activeShipReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_SHIP:
            return action.data;
        case SET_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}
