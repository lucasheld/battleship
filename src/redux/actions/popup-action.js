export const OPEN_POPUP = "OPEN_POPUP";

export const openPopupAction = (enabled, ship, index) => {
    return {
        type: OPEN_POPUP,
        data: {
            enabled: enabled,
            ship: ship,
            index: index
        }
    }
};
