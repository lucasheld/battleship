import {combineReducers} from "redux";
import {playerReducer} from "./reducers/player-reducer"
import {shipReducer} from "./reducers/ship-reducer";
import {activePlayerReducer} from "./reducers/active-player-reducer";
import {modeReducer} from "./reducers/mode-reducer";
import {firstRoundReducer} from "./reducers/first-round-reducer";
import {fieldReducer} from "./reducers/field-reducer";
import {activeShipReducer} from "./reducers/active-ship-reducer";

const reducers = combineReducers({
    playerReducer,
    fieldReducer,
    activePlayerReducer,
    activeShipReducer,
    modeReducer,
    firstRoundReducer,
    shipReducer
});

export default reducers;
