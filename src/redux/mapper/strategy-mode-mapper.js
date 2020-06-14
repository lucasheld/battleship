import {bindActionCreators} from "redux";
import {setPlayerReadyAction} from "../actions/player-action";
import {openPopupAction} from "../actions/popup-action";

/**
 * Maps listed states to props
 * @param state: The entire Redux store state
 * @returns {{ships: shipReducer, popupOpen: (popupOpenReducer|(function(): *)), players: playerReducer}}
 */
export function mapStateToProps(state) {
    return {
        players: state.playerReducer,
        ships: state.shipReducer,
        popupOpen: state.popupOpenReducer
    }
}

/**
 * Dispatches listed action functions to props
 * @param dispatch: Dispatch function used for dispatch an action to props
 * @returns {{setPlayerReady: (function(*=): {data: *, type: string}), openPopup: (function(*=, *=): {data: {ship: *, enabled: *}, type: string})}}
 */
export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setPlayerReady: setPlayerReadyAction,
        openPopup: openPopupAction
    }, dispatch);
}
