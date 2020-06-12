import {SET_ACTIVE_PLAYER} from "../actions/active-player-action";

export function activePlayerReducer(state = -1, action) {
    if (action.type === SET_ACTIVE_PLAYER) {
        return action.data;
    } else {
        return state;
    }
}
