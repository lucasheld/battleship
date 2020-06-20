export const SET_ACTIVE_PLAYER = "SET_ACTIVE_PLAYER";

/**
 * Sets the active player id.
 * @param id: Player id
 * @returns {{data: *, type: string}}
 */
export const setActivePlayerAction = (id) => {
    return {
        type: SET_ACTIVE_PLAYER,
        data: id,
    };
};
