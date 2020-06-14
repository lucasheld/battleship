export const SET_SHIP_DRAGGABLE = "SET_SHIP_DRAGGABLE";

/**
 * Disallows ships to be draggable.
 * @returns {{data: *, type: string}}
 */
export const setShipsNotDraggableAction = () => {
    return {
        type: SET_SHIP_DRAGGABLE,
    }
};
