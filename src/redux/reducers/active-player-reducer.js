export const activePlayerReducer = (state = null, action) => {
    switch (action.type) {
        case "ACTIVE_PLAYER":
            console.log("set data!");
            return action.data;
        default:
            console.log("no data returning state");
            return state;
    }
};
