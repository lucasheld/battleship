export const OPEN_POPUP = "OPEN_POPUP";

/**
 * Sets the orientation popup to opened or closed.
 * @param enabled: True if the popup is open
 * @param ship: The ship within the popup
 * @returns {{data: {ship: *, enabled: *}, type: string}}
 */
export const openPopupAction = (enabled, ship) => {
    return {
        type: OPEN_POPUP,
        data: {
            enabled: enabled,
            ship: ship
        }
    };
};
