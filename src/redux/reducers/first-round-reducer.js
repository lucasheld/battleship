import {SET_FIRST_ROUND} from "../actions/first-round-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

/**
 * Specifies the initial store state.
 * @type {boolean}
 */
const initialState = true;

/**
 * Specifies how to state changes in response to actions.
 * @param state: The store state of this reducer
 * @param action: The payload created by the action
 * @returns {boolean|*}
 */
export function firstRoundReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * Handles setFirstRoundAction response.
         */
        case SET_FIRST_ROUND:
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
