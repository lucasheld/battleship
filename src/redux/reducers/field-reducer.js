import {ADD_FIELD, SET_COLOR, SET_COLOR_GREEN, SET_SHIP_INDEX} from "../actions/field-action";

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
                            shipIndex: action.data.shipIndex
                        })
                    }
                    return field;
                })
            });
        default:
            return state;
    }
}

// ids from playground fields: 1 - 10
//                             11 - 20
//                             ...
//                             91 - 100

// unnecessary field ids -> nevertheless I won't push them to this reducer -> so there are no problems either way
// id from text field upper left corner: 0
// ids from text fields upper row:    -1,  -2, ..., -10
// ids from text fields side column: -11, -21, ..., -101
// they stay negative (or zero) because we never want to change these fields

// ship ids: shipId-index
