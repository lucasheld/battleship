import {SET_SHIP_DRAGGABLE} from "../actions/ship-is-draggable-action";

export function shipDraggableReducer(state = true, action) {
    if (action.type === SET_SHIP_DRAGGABLE) {
        return action.data;
    } else {
        return state;
    }
}
