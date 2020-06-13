export const SET_SHIP_DRAGGABLE = "SET_SHIP_DRAGGABLE";

export const setShipDraggableAction = (isDraggable) => {
    return {
        type: SET_SHIP_DRAGGABLE,
        data: isDraggable
    }
};
