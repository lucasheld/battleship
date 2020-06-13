export const SET_INITIAL_STATE = "SET_INITIAL_STATE";

export const setInitialStateAction = (state) => {
    return {
        type: SET_INITIAL_STATE,
        data: state
    }
};
