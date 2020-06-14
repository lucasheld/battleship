export const SET_SHIPS_NOT_DRAGGABLE = "SET_SHIPS_NOT_DRAGGABLE";

/**
 * Disallows ships to be draggable.
 * @returns {{data: *, type: string}}
 */
export const setShipsNotDraggableAction = () => {
    return {
        type: SET_SHIPS_NOT_DRAGGABLE,
    }
};
