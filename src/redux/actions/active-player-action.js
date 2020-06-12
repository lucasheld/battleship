export const SET_ACTIVE_PLAYER = "SET_ACTIVE_PLAYER";

export const setActivePlayerAction = (id) => {
    return {
        type: SET_ACTIVE_PLAYER,
        data: id,
    }
};
