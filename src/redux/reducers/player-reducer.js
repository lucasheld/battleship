import {CHANGE_PLAYER, SET_READY} from "../actions/player-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

/**
 * Generates a random identicon seed between 1 and 100.
 * @type {number}
 */
let identiconSeed = Math.floor((Math.random() * 100) + 1);

/**
 * Specifies the initial state for player 1.
 * @type {{nick: string, pin: string, ready: boolean, id: number, avatar: number}}
 */
export const player0default = {
    id: 0,
    nick: "player1",
    pin: "",
    avatar: identiconSeed,
    ready: false
};

/**
 * Specifies the initial state for player 2.
 * @type {{nick: string, pin: string, ready: boolean, id: number, avatar: number}}
 */
export const player1default = {
    id: 1,
    nick: "player2",
    pin: "",
    avatar: identiconSeed + 100,
    ready: false
};

/**
 * Specifies the initial store state.
 * @type {{nick: string, pin: string, ready: boolean, id: number, avatar: number}[]}
 */
const initialState = [player0default, player1default];

/**
 * Specifies how to state changes in response to actions.
 * @param state: The store state of this reducer
 * @param action: The payload created by the action
 * @returns {[{nick: string, pin: string, ready: boolean, id: number, avatar: number}, {nick: string, pin: string, ready: boolean, id: number, avatar: number}]|unknown[]}
 */
export function playerReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * Handles changePlayerAction response.
         */
        case CHANGE_PLAYER:
            return state.map(player => {
                if (player.id === action.data.id) {
                    return Object.assign({}, player, {
                        nick: action.data.nick,
                        pin: action.data.pin,
                        avatar: action.data.avatar
                    });
                }
                return player;
            });
        /**
         * Handles setPlayerReadyAction response.
         */
        case SET_READY:
            return state.map(player => {
                if (player.id === action.data) {
                    return Object.assign({}, player, {
                        ready: true
                    });
                }
                return player;
            });
        /**
         * Handles setInitialStateAction response.
         */
        case SET_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}
