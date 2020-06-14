import {setActivePlayerAction} from "../actions/active-player-action";
import {bindActionCreators} from "redux";
import {setModeAction} from "../actions/mode-action";

/**
 * Maps listed states to props
 * @param state: The entire Redux store state
 * @returns {{players: playerReducer}}
 */
export function mapStateToProps(state) {
    return {
        players: state.playerReducer
    }
}

/**
 * Dispatches listed action functions to props
 * @param dispatch: Dispatch function used for dispatch an action to props
 * @returns {{setActivePlayer: (function(*=): {data: *, type: string}), setMode: (function(*=): {data: *, type: string})}}
 */
export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setActivePlayer: setActivePlayerAction,
        setMode: setModeAction
    }, dispatch);
}
