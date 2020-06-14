import {SET_ACTIVE_SHIP} from "../actions/active-ship-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

/**
 * Specifies the initial store state.
 * @type {null}
 */
const initialState = null;

/**
 * Specifies how to state changes in response to actions.
 * @param state: The store state of this reducer
 * @param action: The payload created by the action
 * @returns {null|*}
 */
export function activeShipReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * Handles setActiveShipAction response.
         */
        case SET_ACTIVE_SHIP:
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
