import {SET_FIRST_ROUND} from "../actions/first-round-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

const initialState = true;

export function firstRoundReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FIRST_ROUND:
            return action.data;
        case SET_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}
