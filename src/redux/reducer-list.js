import {combineReducers} from "redux";
import {playerReducer} from "./reducers/player-reducer"
import {shipReducer} from "./reducers/ship-reducer";

const reducers = combineReducers({
    playerReducer,
    shipReducer
});

export default reducers;
