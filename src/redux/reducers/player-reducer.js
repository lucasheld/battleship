import {CHANGE_PLAYER, SET_READY} from "../actions/player-action";

let identiconSeed = Math.floor((Math.random() * 100) + 1); // random int between 1 and 100

export const player0default = {
    id: 0,
    nick: "player1",
    pin: "",
    avatar: identiconSeed,
    ready: false
};

export const player1default = {
    id: 1,
    nick: "player2",
    pin: "",
    avatar: identiconSeed + 1,
    ready: false
};

const initialState = [player0default, player1default];

export function playerReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_PLAYER:
            return state.map(player => {
                if (player.id === action.data.id) {
                    return Object.assign({}, player, {
                        nick: action.data.nick,
                        pin: action.data.pin,
                        avatar: action.data.avatar
                    })
                }
                return player;
            });
        case SET_READY:
            return state.map(player => {
                if (player.id === action.data.id) {
                    return Object.assign({}, player, {
                        ready: !player.ready
                    })
                }
                return player;
            });
        default:
            return state;
    }
}
