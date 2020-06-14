import {setNoFireAction} from "../actions/no-fire-action";
import {bindActionCreators} from "redux";

/**
 * Maps listed states to props
 * @param state: The entire Redux store state
 * @returns {{mode: modeReducer, isFirstRound: firstRoundReducer, players: playerReducer, activePlayerId: activePlayerReducer}}
 */
export function mapStateToProps(state) {
    return {
        players: state.playerReducer,
        activePlayerId: state.activePlayerReducer,
        mode: state.modeReducer,
        isFirstRound: state.firstRoundReducer
    }
}

/**
 * Dispatches listed action functions to props
 * @param dispatch: Dispatch function used for dispatch an action to props
 * @returns {{setNoFire: (function(*=): {data: *, type: string})}}
 */
export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setNoFire: setNoFireAction
    }, dispatch);
}
