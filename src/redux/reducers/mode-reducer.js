import {SET_MODE} from "../actions/mode-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

/**
 * Specifies the initial store state.
 * @type {number}
 */
const initialState = -1;

/**
 * Specifies how to state changes in response to actions.
 * @param state: The store state of this reducer
 * @param action: The payload created by the action
 * @returns {number|*}
 */
export function modeReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * Handles setModeAction response.
         */
        case SET_MODE:
            return action.data;
        /**
         * Handles setInitialStateAction response.
         */
        case SET_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}
