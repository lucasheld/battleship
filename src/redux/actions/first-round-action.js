export const SET_FIRST_ROUND = "SET_FIRST_ROUND";

/**
 * Sets true or false depending on first round.
 * @param isFirstRound: True if the fist round is active otherwise false
 * @returns {{data: *, type: string}}
 */
export const setFirstRoundAction = (isFirstRound) => {
    return {
        type: SET_FIRST_ROUND,
        data: isFirstRound
    }
};
