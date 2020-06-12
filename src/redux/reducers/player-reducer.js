import {ADD_PLAYER, CHANGE_PLAYER} from "../actions/player-action";

export function playerReducer(state = [], action) {
    switch (action.type) {
        case ADD_PLAYER:
            return [
                ...state,
                action.data
            ];
        case CHANGE_PLAYER:
            return state.map(player => {
                if (player.id === action.data.id) {
                    player = action.data
                }
                return player
            });
        default:
            return state
    }
}
