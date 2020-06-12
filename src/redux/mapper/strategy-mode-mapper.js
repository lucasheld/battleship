import {bindActionCreators} from "redux";
import {setPlayerReadyAction} from "../actions/player-action";

export function mapStateToProps(state) {
    return {
        players: state.playerReducer
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setPlayerReady: setPlayerReadyAction
    }, dispatch);
}
