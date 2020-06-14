import {ADD_ORIENTATION} from "../actions/orientation-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

const initialState = {
    PLAYER1FULL: [],
    PLAYER2FULL: []
};

export function orientationReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ORIENTATION:
            let add = false;
            let newState = Object.assign({}, state, {
                [action.playground]: state[action.playground].map(o => {
                    if (o.id === action.data.id && o.name === action.data.name) {
                        add = true;
                        return action.data;
                    }
                    return o;
                })
            });
            if (add) {
                return newState;
            } else {
                return Object.assign({}, state, {
                    [action.playground]: [
                        ...state[action.playground],
                        action.data
                    ]
                });
            }
        case SET_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}
