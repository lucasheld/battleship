import {combineReducers} from "redux";
import {testReducer} from "./reducers/test-reducer"
import {activePlayerReducer, inactivePlayerReducer} from "./reducers/player-reducer"

const reducers = combineReducers({
    testState: testReducer,
    activePlayerState: activePlayerReducer,
    inactivePlayerState: inactivePlayerReducer
});

export default reducers;
