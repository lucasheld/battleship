export const activePlayerReducer = (state = null, action) => {
    switch (action.type) {
        case "ACTIVE_PLAYER":
            console.log("set data!");
            return action.data;
        default:
            return state;
    }
};
