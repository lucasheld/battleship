import {combineReducers} from "redux";
import testReducer from "./reducers/test-reducer"
import {activePlayerReducer} from "./reducers/active-player-reducer"

const reducers = combineReducers({
    test: testReducer,
    aPlayer: activePlayerReducer
});

export default reducers;
