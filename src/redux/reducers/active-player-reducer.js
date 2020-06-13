import {SET_ACTIVE_PLAYER} from "../actions/active-player-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

const initialState = -1;

export function activePlayerReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_PLAYER:
            return action.data;
        case SET_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}
