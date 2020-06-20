export var SET_READY = "SET_READY";
export const CHANGE_PLAYER = "CHANGE_PLAYER";

/**
 * Changes player attributes.
 * @param player: The player with changed attributes but unchanged id.
 * @returns {{data: *, type: string}}
 */
export const changePlayerAction = (player) => {
    return {
        type: CHANGE_PLAYER,
        data: player,
    };
};

/**
 * Sets a player ready.
 * @param id: The player id
 * @returns {{data: *, type: string}}
 */
export const setPlayerReadyAction = (id) => {
    return {
        type: SET_READY,
        data: id,
    };
};
