import {SET_SHIP_DRAGGABLE} from "../actions/ship-is-draggable-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

const initialState = true;

export function shipDraggableReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SHIP_DRAGGABLE:
            return action.data;
        case SET_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}
