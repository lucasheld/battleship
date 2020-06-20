export const SET_MODE = "SET_MODE";

/**
 * Sets current game mode.
 * @param id: The mode id
 * @returns {{data: *, type: string}}
 */
export const setModeAction = (id) => {
    return {
        type: SET_MODE,
        data: id,
    };
};

/**
 * Types of different game modes.
 * @type {{FIGHT: number, STRATEGY: number}}
 */
export const MODES = {
    STRATEGY: 0,
    FIGHT: 1
};
