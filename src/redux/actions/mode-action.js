export const SET_MODE = "SET_MODE";

export const setModeAction = (id) => {
    return {
        type: SET_MODE,
        data: id,
    }
};

export const MODES = {
    STRATEGY: 0,
    BATTLE: 1
};
