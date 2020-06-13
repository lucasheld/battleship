export const SET_ACTIVE_SHIP = "SET_ACTIVE_SHIP";

export const setActiveShipAction = (ship) => {
    return {
        type: SET_ACTIVE_SHIP,
        data: ship,
    }
};
