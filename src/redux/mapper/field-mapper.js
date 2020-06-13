import {addFieldAction, setFieldColorAction} from "../actions/field-action";
import {bindActionCreators} from "redux";
import {setActiveShipAction} from "../actions/active-ship-action";

export function mapStateToProps(state) {
    return {
        fields: state.fieldReducer,
        activeShip: state.activeShipReducer
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addField: addFieldAction,
        setFieldColor: setFieldColorAction,
        setActiveShip: setActiveShipAction
    }, dispatch);
}
