import {addFieldAction, setFieldColorAction} from "../actions/field-action";
import {bindActionCreators} from "redux";

export function mapStateToProps(state) {
    return {
        fields: state.fieldReducer
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addField: addFieldAction,
        setFieldColor: setFieldColorAction
    }, dispatch);
}
