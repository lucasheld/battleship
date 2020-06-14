import {bindActionCreators} from "redux";

export function mapStateToProps(state) {
    return {
        orient: state.orientationReducer
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}
