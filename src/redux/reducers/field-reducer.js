import {ADD_FIELD, SET_COLOR, SET_COLOR_GREEN, SET_SHIP_INDEX} from "../actions/field-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

/**
 * Types of different playgrounds.
 * @type {{PLAYER1FULL: string, PLAYER1PART: string, PLAYER2FULL: string, PLAYER2PART: string}}
 */
export const PLAYGROUND_TYPE = {
    PLAYER1FULL: "PLAYER1FULL",
    PLAYER2FULL: "PLAYER2FULL",
    PLAYER1PART: "PLAYER1PART",
    PLAYER2PART: "PLAYER2PART"
};

/**
 * Specifies the initial store state.
 * @type {{PLAYER1FULL: [], PLAYER1PART: [], PLAYER2FULL: [], PLAYER2PART: []}}
 */
const initialState = {
    PLAYER1FULL: [],
    PLAYER2FULL: [],
    PLAYER1PART: [],
    PLAYER2PART: []
};

/**
 * Specifies how to state changes in response to actions.
 * @param state: The store state of this reducer
 * @param action: The payload created by the action
 * @returns {{PLAYER1FULL: *[], PLAYER1PART: *[], PLAYER2FULL: *[], PLAYER2PART: *[]}}
 */
export function fieldReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * Handles addFieldAction response.
         */
        case ADD_FIELD:
            return Object.assign({}, state, {
                [action.playground]: [
                    ...state[action.playground],
                    action.data
                ]
            });
        /**
         * Handles setFieldColorAction response.
         */
        case SET_COLOR:
            return Object.assign({}, state, {
                [action.playground]: state[action.playground].map(field => {
                    if (field.id === action.data.id) {
                        return Object.assign({}, field, {
                            color: action.data.color
                        });
                    }
                    return field;
                })
            });
        /**
         * Handles setFieldColorGreenAction response.
         */
        case SET_COLOR_GREEN:
            return Object.assign({}, state, {
                [action.playground]: state[action.playground].map(field => {
                    if (field.color === "field-blocked") {
                        return Object.assign({}, field, {
                            color: "field-valid"
                        });
                    }
                    return field;
                })
            });
        /**
         * Handles setShipFieldIndexAction response.
         */
        case SET_SHIP_INDEX:
            return Object.assign({}, state, {
                [action.playground]: state[action.playground].map(field => {
                    if (field.id === action.data.id) {
                        return Object.assign({}, field, {
                            shipIndex: action.data.index
                        });
                    }
                    return field;
                })
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

// ids from playground fields: 1 - 10
//                             11 - 20
//                             ...
//                             91 - 100
