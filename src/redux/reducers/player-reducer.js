export const activePlayerReducer = (state = null, action) => {
    if (action.type === "ACTIVE_PLAYER") {
        return action.data;
    }
    return state;
};

export const inactivePlayerReducer = (state = null, action) => {
    if (action.type === "INACTIVE_PLAYER") {
        return action.data;
    }
    return state;
};
