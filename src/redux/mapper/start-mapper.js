import {bindActionCreators} from "redux";
import {setInitialStateAction} from "../actions/initial-state-action";

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
 * @returns {{setInitialState: (function(): {type: string})}}
 */
export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setInitialState: setInitialStateAction
    }, dispatch);
}
