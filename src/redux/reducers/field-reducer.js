import {ADD_FIELD, SET_COLOR} from "../actions/field-action";

export const playgroundType = {
    PLAYER1FULL: "PLAYER1FULL",
    PLAYER2FULL: "PLAYER2FULL",
    PLAYER1PART: "PLAYER1PART",
    PLAYER2PART: "PLAYER2PART"
}

const initialState = {
    PLAYER1FULL: [],
    PLAYER2FULL: [],
    PLAYER1PART: [],
    PLAYER2PART: []
}

export function fieldReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FIELD:
            return Object.assign({}, state, {
                [action.playground]: [
                    ...state[action.playground],
                    action.data
                ]
            })
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
            })
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

// ship ids?
