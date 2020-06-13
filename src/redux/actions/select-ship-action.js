export const SELECT_SHIP = "SELECT_SHIP";
export const DESELECT_SHIP = "DESELECT_SHIP";
export const DISABLE_SHIP = "DISABLE_SHIP";

export const selectShipAction = (playground, ship) => {
    return {
        type: SELECT_SHIP,
        data: ship,
        playground: playground
    }
};

export const deselectShipAction = (playground, ship) => {
    return {
        type: DESELECT_SHIP,
        data: ship,
        playground: playground
    }
};

export const disableShipAction = (playground, ship) => {
    return {
        type: DISABLE_SHIP,
        data: ship,
        playground: playground
    }
};
