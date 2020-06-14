import {OPEN_POPUP} from "../actions/popup-action";

const initialState = {
    enabled: false,
    ship: null,
    index: null
}

export function popupOpenReducer(state = initialState, action) {
    if (action.type === OPEN_POPUP) {
        return action.data;
    } else {
        return state;
    }
}
