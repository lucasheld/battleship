import {addFieldAction, setFieldColorAction, setFieldShipIndexAction} from "../actions/field-action";
import {bindActionCreators} from "redux";
import {setActiveShipAction} from "../actions/active-ship-action";
import {deselectShipAction, disableShipAction, selectShipAction} from "../actions/select-ship-action";
import {openPopupAction} from "../actions/popup-action";

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
        setShipFieldIndex: setFieldShipIndexAction,
        selectShip: selectShipAction,
        deselectShip: deselectShipAction,
        disableShip: disableShipAction,
        openPopup: openPopupAction
    }, dispatch);
}
