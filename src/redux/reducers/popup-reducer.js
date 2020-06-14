import {OPEN_POPUP} from "../actions/popup-action";

/**
 * Specifies the initial store state.
 * @type {{ship: null, index: null, enabled: boolean}}
 */
const initialState = {
    enabled: false,
    ship: null,
    index: null
}

/**
 * Specifies how to state changes in response to actions.
 * @param state: The store state of this reducer
 * @param action: The payload created by the action
 * @returns {{ship: null, index: null, enabled: boolean}|*}
 */
export function popupOpenReducer(state = initialState, action) {
    /**
     * Handles openPopupAction response.
     */
    if (action.type === OPEN_POPUP) {
        return action.data;
    } else {
        return state;
    }
}
