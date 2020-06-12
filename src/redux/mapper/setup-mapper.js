import {setActivePlayerAction} from "../actions/active-player-action";
import {bindActionCreators} from "redux";
import {setModeAction} from "../actions/mode-action";

export function mapStateToProps(state) {
    return {
        players: state.playerReducer
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setActivePlayer: setActivePlayerAction,
        setMode: setModeAction
    }, dispatch);
}
