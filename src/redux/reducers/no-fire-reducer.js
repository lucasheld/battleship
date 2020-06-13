import {SET_NO_FIRE} from "../actions/no-fire-action";

export function noFireReducer(state = false, action) {
    if (action.type === SET_NO_FIRE) {
        return action.data;
    } else {
        return state;
    }
}
