import {bindActionCreators} from "redux";
import {changePlayerAction} from "../actions/player-action"

export function mapStateToProps(state) {
    return {
        players: state.playerReducer
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        changePlayer: changePlayerAction
    }, dispatch);
}
