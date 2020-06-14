import {addFieldAction, setFieldColorAction, setShipFieldIndexAction} from "../actions/field-action";
import {bindActionCreators} from "redux";
import {setActiveShipAction} from "../actions/active-ship-action";
import {deselectShipAction, disableShipAction, selectShipAction} from "../actions/select-ship-action";
import {openPopupAction} from "../actions/popup-action";
import {setNoFireAction} from "../actions/no-fire-action";
import {setOrientationAction} from "../actions/orientation-action";

export function mapStateToProps(state) {
    return {
        fields: state.fieldReducer,
        activeShip: state.activeShipReducer,
        ships: state.shipReducer,
        shipIsDraggable: state.shipDraggableReducer,
        noFire: state.noFireReducer,
        orient: state.orientationReducer
    }
}

export function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addField: addFieldAction,
        setFieldColor: setFieldColorAction,
        setActiveShip: setActiveShipAction,
        setShipFieldIndex: setShipFieldIndexAction,
        selectShip: selectShipAction,
        deselectShip: deselectShipAction,
        disableShip: disableShipAction,
        openPopup: openPopupAction,
        setNoFire: setNoFireAction,
        setOrient: setOrientationAction
    }, dispatch);
}
