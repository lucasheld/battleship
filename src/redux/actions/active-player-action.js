export const activePlayerAction = (player) => {
    console.log("player action called!");
    return {
        type: "ACTIVE_PLAYER",
        data: player
    }
};
