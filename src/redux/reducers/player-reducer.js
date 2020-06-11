import {ADD_PLAYER, CHANGE_PLAYER} from "../actions/player-action";

export function playerReducer(state = { players: [] }, action) {
    switch (action.type) {
        case ADD_PLAYER:
            return Object.assign({}, state, {
                players: [
                    ...state.players,
                    {
                        id: action.data.id,
                        nick: action.data.nick,
                        pin: action.data.pin,
                        avatar: action.data.avatar
                    }
                ]
            });
        case CHANGE_PLAYER:
            return state.players.map(player => {
                if (player.id === action.data.id) {
                    return Object.assign({}, player, {
                        nick: action.data.nick,
                        pin: action.data.pin,
                        avatar: action.data.avatar
                    })
                }
                return player
            });
        default:
            return state
    }
}
