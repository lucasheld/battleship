export const OPEN_POPUP = "OPEN_POPUP";

export const openPopupAction = (enabled, ship) => {
    return {
        type: OPEN_POPUP,
        data: {
            enabled: enabled,
            ship: ship
        }
    }
};
