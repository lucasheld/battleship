import {SET_NO_FIRE} from "../actions/no-fire-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

const initialState = false;

export function noFireReducer(state = initialState, action) {
    switch (action.type) {
        case SET_NO_FIRE:
            return action.data;
        case SET_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}
