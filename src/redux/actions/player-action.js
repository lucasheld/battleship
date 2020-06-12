export var SET_READY = "SET_READY";
export const CHANGE_PLAYER = "CHANGE_PLAYER";

export const changePlayerAction = (player) => {
    return {
        type: CHANGE_PLAYER,
        data: player,
    }
};

export const setPlayerReadyAction = (id) => {
    return {
        type: SET_READY,
        data: id,
    }
};
