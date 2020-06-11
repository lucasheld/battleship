import {bindActionCreators} from "redux";
import {activePlayerAction} from "../actions/active-player-action"

export function mapStateToProps(state) {
    return {
        test: state.testState,
        activePlayer: state.activePlayerState
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        activePlayerAction: activePlayerAction
    }, dispatch);
}
