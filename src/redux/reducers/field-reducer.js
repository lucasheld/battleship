import {ADD_FIELD, SET_COLOR, SET_COLOR_GREEN, SET_SHIP_INDEX} from "../actions/field-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

export const PLAYGROUND_TYPE = {
    PLAYER1FULL: "PLAYER1FULL",
    PLAYER2FULL: "PLAYER2FULL",
    PLAYER1PART: "PLAYER1PART",
    PLAYER2PART: "PLAYER2PART"
};

const initialState = {
    PLAYER1FULL: [],
    PLAYER2FULL: [],
    PLAYER1PART: [],
    PLAYER2PART: []
};

export function fieldReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FIELD:
            return Object.assign({}, state, {
                [action.playground]: [
                    ...state[action.playground],
                    action.data
                ]
            });
        case SET_COLOR:
            return Object.assign({}, state, {
                [action.playground]: state[action.playground].map(field => {
                    if (field.id === action.data.id) {
                        return Object.assign({}, field, {
                            color: action.data.color
                        })
                    }
                    return field;
                })
            });
        case SET_COLOR_GREEN:
            return Object.assign({}, state, {
                [action.playground]: state[action.playground].map(field => {
                    if (field.color === "field-blocked") {
                        return Object.assign({}, field, {
                            color: "field-valid"
                        })
                    }
                    return field;
                })
            });
        case SET_SHIP_INDEX:
            return Object.assign({}, state, {
                [action.playground]: state[action.playground].map(field => {
                    if (field.id === action.data.id) {
                        return Object.assign({}, field, {
                            shipIndex: action.data.index
                        })
                    }
                    return field;
                })
            });
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
