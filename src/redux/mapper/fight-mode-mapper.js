import {setFirstRoundAction} from "../actions/first-round-action";
import {setShipDraggableAction} from "../actions/ship-is-draggable-action";
import {bindActionCreators} from "redux";

export function mapStateToProps(state) {
    return {
        players: state.playerReducer,
        activePlayerId: state.activePlayerReducer,
        mode: state.modeReducer,
        isFirstRound: state.firstRoundReducer
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setFirstRound: setFirstRoundAction,
        setShipDraggable: setShipDraggableAction
    }, dispatch);
}
