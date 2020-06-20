import {addFieldAction, setFieldColorAction, setShipFieldIndexAction} from "../actions/field-action";
import {bindActionCreators} from "redux";
import {setActiveShipAction} from "../actions/active-ship-action";
import {deselectShipAction, disableShipAction, selectShipAction} from "../actions/select-ship-action";
import {openPopupAction} from "../actions/popup-action";
import {setNoFireAction} from "../actions/no-fire-action";
import {setOrientationAction} from "../actions/orientation-action";

/**
 * Maps listed states to props
 * @param state: The entire Redux store state
 * @returns {{activeShip: activeShipReducer, ships: shipReducer, orient: orientationReducer, noFire: noFireReducer, shipIsDraggable: shipDraggableReducer, fields: fieldReducer}}
 */
export function mapStateToProps(state) {
    return {
        fields: state.fieldReducer,
        activeShip: state.activeShipReducer,
        ships: state.shipReducer,
        shipIsDraggable: state.shipDraggableReducer,
        noFire: state.noFireReducer,
        orient: state.orientationReducer
    };
}

/**
 * Dispatches listed action functions to props
 * @param dispatch: Dispatch function used for dispatch an action to props
 * @returns {{setFieldColor: (function(*=, *=, *=): {data: {color: *, id: *}, playground: *, type: string}), selectShip: (function(*=, *=): {data: *, playground: *, type: string}), deselectShip: (function(*=, *=): {data: *, playground: *, type: string}), setShipFieldIndex: (function(*=, *=, *=): {data: {index: *, id: *}, playground: *, type: string}), setNoFire: (function(*=): {data: *, type: string}), openPopup: (function(*=, *=): {data: {ship: *, enabled: *}, type: string}), addField: (function(*=, *=): {data: *, playground: *, type: string}), setOrient: (function(*=, *=, *=, *=): {data: {orientation: *, name: *, id: *}, playground: *, type: string}), setActiveShip: (function(*=): {data: *, type: string}), disableShip: (function(*=, *=): {data: *, playground: *, type: string})}}
 */
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
