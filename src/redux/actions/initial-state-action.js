export const SET_INITIAL_STATE = "SET_INITIAL_STATE";

/**
 * Resets all states.
 * @returns {{data: *, type: string}}
 */
export const setInitialStateAction = () => {
    return {
        type: SET_INITIAL_STATE
    }
};
