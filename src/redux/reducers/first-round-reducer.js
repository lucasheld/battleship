import {SET_FIRST_ROUND} from "../actions/first-round-action";

export function firstRoundReducer(state = true, action) {
    if (action.type === SET_FIRST_ROUND) {
        return action.data;
    } else {
        return state;
    }
}
