import {bindActionCreators} from "redux";
import {activePlayerAction, inactivePlayerAction} from "../actions/player-action";

export function mapStateToProps(state) {
    return {

    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setActivePlayer: activePlayerAction,
        setInactivePlayer: inactivePlayerAction
    }, dispatch);
}
