import {OPEN_POPUP} from "../actions/popup-action";

export function popupOpenReducer(state = false, action) {
    if (action.type === OPEN_POPUP) {
        return action.data;
    } else {
        return state;
    }
}
