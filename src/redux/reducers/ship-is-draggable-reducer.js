import {SET_SHIPS_NOT_DRAGGABLE} from "../actions/ship-is-draggable-action";
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
 * @returns {boolean}
 */
export function shipDraggableReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * Handles setShipsNotDraggableAction response.
         */
        case SET_SHIPS_NOT_DRAGGABLE:
            return false;
        /**
         * Handles setInitialStateAction response.
         */
        case SET_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}
