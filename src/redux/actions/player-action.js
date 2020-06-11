export const activePlayerAction = (player) => {
    return {
        type: "ACTIVE_PLAYER",
        data: player
    }
};

export const inactivePlayerAction = (player) => {
    return {
        type: "INACTIVE_PLAYER",
        data: player
    }
};
