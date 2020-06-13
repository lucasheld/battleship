import {setFirstRoundAction} from "../actions/first-round-action";
import {setShipDraggableAction} from "../actions/ship-is-draggable-action";
import {bindActionCreators} from "redux";
import {setFieldColorGreenAction} from "../actions/field-action";
import {setActivePlayerAction} from "../actions/active-player-action";

export function mapStateToProps(state) {
    return {
        players: state.playerReducer,
        activePlayerId: state.activePlayerReducer,
        mode: state.modeReducer,
        isFirstRound: state.firstRoundReducer,
        fields: state.fieldReducer,
        noFire: state.noFireReducer
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setFirstRound: setFirstRoundAction,
        setShipDraggable: setShipDraggableAction,
        setFieldColorGreen: setFieldColorGreenAction,
        setActivePlayer: setActivePlayerAction
    }, dispatch);
}
