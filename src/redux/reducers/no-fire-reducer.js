import {SET_NO_FIRE} from "../actions/no-fire-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

/**
 * Specifies the initial store state.
 * @type {boolean}
 */
const initialState = false;

/**
 * Specifies how to state changes in response to actions.
 * @param state: The store state of this reducer
 * @param action: The payload created by the action
 * @returns {boolean|*}
 */
export function noFireReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * Handles setNoFireAction response.
         */
        case SET_NO_FIRE:
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
