import {ADD_PLAYER, CHANGE_PLAYER, SET_READY} from "../actions/player-action";

export function playerReducer(state = [], action) {
    switch (action.type) {
        case ADD_PLAYER:
            return [
                ...state,
                {
                    id: action.data.id,
                    nick: action.data.nick,
                    pin: action.data.pin,
                    avatar: action.data.avatar,
                    ready: false
                }
            ];
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
