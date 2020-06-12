export var SET_READY = "SET_READY";
export const ADD_PLAYER = "ADD_PLAYER";
export const CHANGE_PLAYER = "CHANGE_PLAYER";

export const addPlayerAction = (player) => {
    return {
        type: ADD_PLAYER,
        data: player,
    }
};

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
