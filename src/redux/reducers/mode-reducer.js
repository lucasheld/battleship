import {SET_MODE} from "../actions/mode-action";

export function modeReducer(state = -1, action) {
    if (action.type === SET_MODE) {
        return action.data;
    } else {
        return state;
    }
}
