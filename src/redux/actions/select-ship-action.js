export const SELECT_SHIP = "SET_ACTIVE_SHIP";

export const selectShipAction = (ship) => {
    return {
        type: SELECT_SHIP,
        data: ship,
    }
};
