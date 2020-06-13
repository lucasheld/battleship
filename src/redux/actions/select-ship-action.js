export const SELECT_SHIP = "SELECT_SHIP";
export const DESELECT_SHIP = "DESELECT_SHIP";
export const DISABLE_SHIP = "DISABLE_SHIP";

export const selectShipAction = (ship) => {
    return {
        type: SELECT_SHIP,
        data: ship,
    }
};

export const deselectShipAction = (ship) => {
    return {
        type: DESELECT_SHIP,
        data: ship,
    }
};

export const disableShipAction = (ship) => {
    return {
        type: DISABLE_SHIP,
        data: ship,
    }
};
