export const SELECT_SHIP = "SELECT_SHIP";
export const DESELECT_SHIP = "DESELECT_SHIP";
export const DISABLE_SHIP = "DISABLE_SHIP";

/**
 * Selects a ship.
 * @param playground: The playground that holds the ship
 * @param ship: The ship that is selected
 * @returns {{data: *, playground: *, type: string}}
 */
export const selectShipAction = (playground, ship) => {
    return {
        type: SELECT_SHIP,
        data: ship,
        playground: playground
    }
};

/**
 * Deselects a ship.
 * @param playground: The playground that holds the ship
 * @param ship: The ship that is deselected
 * @returns {{data: *, playground: *, type: string}}
 */
export const deselectShipAction = (playground, ship) => {
    return {
        type: DESELECT_SHIP,
        data: ship,
        playground: playground
    }
};

/**
 * Disables a ship.
 * @param playground: The playground that holds the ship
 * @param ship: The ship that is disabled
 * @returns {{data: *, playground: *, type: string}}
 */
export const disableShipAction = (playground, ship) => {
    return {
        type: DISABLE_SHIP,
        data: ship,
        playground: playground
    }
};
