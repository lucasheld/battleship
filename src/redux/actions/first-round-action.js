export const SET_FIRST_ROUND = "SET_FIRST_ROUND";

export const setFirstRoundAction = (isFirstRound) => {
    return {
        type: SET_FIRST_ROUND,
        data: isFirstRound
    }
};
