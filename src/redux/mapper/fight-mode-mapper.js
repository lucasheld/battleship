import {setFirstRoundAction} from "../actions/first-round-action";
import {setShipsNotDraggableAction} from "../actions/ship-is-draggable-action";
import {bindActionCreators} from "redux";
import {setFieldColorGreenAction} from "../actions/field-action";
import {setActivePlayerAction} from "../actions/active-player-action";

/**
 * Maps listed states to props
 * @param state: The entire Redux store state
 * @returns {{mode: modeReducer, isFirstRound: firstRoundReducer, noFire: noFireReducer, players: playerReducer, activePlayerId: activePlayerReducer, fields: fieldReducer}}
 */
export function mapStateToProps(state) {
    return {
        players: state.playerReducer,
        activePlayerId: state.activePlayerReducer,
        mode: state.modeReducer,
        isFirstRound: state.firstRoundReducer,
        fields: state.fieldReducer,
        noFire: state.noFireReducer
    };
}

/**
 * Dispatches listed action functions to props
 * @param dispatch: Dispatch function used for dispatch an action to props
 * @returns {{setActivePlayer: (function(*=): {data: *, type: string}), setShipsNotDraggable: (function(): {type: string}), setFirstRound: (function(*=): {data: *, type: string}), setFieldColorGreen: (function(*=): {playground: *, type: string})}}
 */
export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setFirstRound: setFirstRoundAction,
        setShipsNotDraggable: setShipsNotDraggableAction,
        setFieldColorGreen: setFieldColorGreenAction,
        setActivePlayer: setActivePlayerAction
    }, dispatch);
}
