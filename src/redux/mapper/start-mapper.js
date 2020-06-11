import {bindActionCreators} from "redux";
import {addPlayerAction, changePlayerAction} from "../actions/player-action";

export function mapStateToProps(state) {
    return {
        players: state.playerReducer
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addPlayer: addPlayerAction,
        changePlayer: changePlayerAction
    }, dispatch);
}
