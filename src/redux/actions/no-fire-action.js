export const SET_NO_FIRE = "SET_NO_FIRE";

/**
 * Sets possibility to fire in fight mode to true or false.
 * @param noFire: True if user can not fire otherwise False
 * @returns {{data: *, type: string}}
 */
export const setNoFireAction = (noFire) => {
    return {
        type: SET_NO_FIRE,
        data: noFire
    };
};
