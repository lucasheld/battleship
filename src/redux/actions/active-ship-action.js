export const SET_ACTIVE_SHIP = "SET_ACTIVE_SHIP";

/**
 * Sets the ship that is currently selected.
 * @param ship: Ship that is selected
 * @returns {{data: *, type: string}}
 */
export const setActiveShipAction = (ship) => {
    return {
        type: SET_ACTIVE_SHIP,
        data: ship,
    }
};
