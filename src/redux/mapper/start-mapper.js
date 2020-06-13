import {bindActionCreators} from "redux";
import {setInitialStateAction} from "../actions/initial-state-action";

export function mapStateToProps(state) {
    return {
        players: state.playerReducer
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setInitialState: setInitialStateAction
    }, dispatch);
}
