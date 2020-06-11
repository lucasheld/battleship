import {bindActionCreators} from "redux";
import {activePlayerAction} from "../actions/active-player-action"

export function mapStateToProps(state) {
    console.log("map state called!");
    return {
        test: state.test,
        activePlayer: state.aPlayer
    }
}

export function matchDispatchToProps(dispatch) {
    console.log("match dispatch called!");
    return bindActionCreators({
        activePlayer: activePlayerAction
    }, dispatch);
}
