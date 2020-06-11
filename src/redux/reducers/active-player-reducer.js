export const activePlayerReducer = (state = null, action) => {
    switch (action.type) {
        case "ACTIVE_PLAYER":
            return action.data;
        default:
            return state;
    }
};
