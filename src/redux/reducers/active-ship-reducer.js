import {SET_ACTIVE_SHIP} from "../actions/active-ship-action";

export function activeShipReducer(state = "", action) {
    if (action.type === SET_ACTIVE_SHIP) {
        return action.data;
    } else {
        return state;
    }
}
