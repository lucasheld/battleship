export var SET_COLOR = "SET_COLOR";
export var ADD_FIELD = "ADD_FIELD";
export var SET_SHIP_INDEX = "SET_SHIP_INDEX";

export const setFieldColorAction = (playground, id) => {
    return {
        type: SET_COLOR,
        data: id,
        playground: playground
    }
};

export const addFieldAction = (playground, field) => {
    return {
        type: ADD_FIELD,
        data: field,
        playground: playground
    }
};

export const setFieldShipIndexAction = (index) => {
    return {
        type: SET_SHIP_INDEX,
        data: index,
    }
};

export const FIELD_TYPES = {
    TEXT: 0,
    PLAYGROUND: 1,
    SHIP: 2
};
