import {addFieldAction, setFieldColorAction} from "../actions/field-action";
import {bindActionCreators} from "redux";
import {setActiveShipAction} from "../actions/active-ship-action";
import {deselectShipAction, disableShipAction, selectShipAction} from "../actions/select-ship-action";

export function mapStateToProps(state) {
    return {
        fields: state.fieldReducer,
        activeShip: state.activeShipReducer,
        ships: state.shipReducer
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addField: addFieldAction,
        setFieldColor: setFieldColorAction,
        setActiveShip: setActiveShipAction,
        selectShip: selectShipAction,
        deselectShip: deselectShipAction,
        disableShip: disableShipAction
    }, dispatch);
}
