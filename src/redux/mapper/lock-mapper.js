import {setNoFireAction} from "../actions/no-fire-action";
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
        setNoFire: setNoFireAction
    }, dispatch);
}
