import {bindActionCreators} from "redux";
import {activePlayerAction, inactivePlayerAction} from "../actions/player-action"

export function mapStateToProps(state) {
    return {
        test: state.testState,
        activePlayer: state.activePlayerState,
        inactivePlayer: state.inactivePlayerState
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setActivePlayer: activePlayerAction,
        setInactivePlayer: inactivePlayerAction
    }, dispatch);
}
