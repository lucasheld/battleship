import {bindActionCreators} from "redux";
import {activePlayerAction} from "../actions/active-player-action"

export function mapStateToProps(state) {
    return {
        test: state.test,
        activePlayer: state.activePlayer
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        activePlayer: activePlayerAction
    }, dispatch);
}
