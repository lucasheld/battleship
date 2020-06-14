export var SET_COLOR = "SET_COLOR";
export var SET_COLOR_GREEN = "SET_COLOR_GREEN";
export var ADD_FIELD = "ADD_FIELD";
export var SET_SHIP_INDEX = "SET_SHIP_INDEX";

export const setFieldColorAction = (playground, id) => {
    return {
        type: SET_COLOR,
        data: id,
        playground: playground
    }
};

export const setFieldColorGreenAction = (playground) => {
    return {
        type: SET_COLOR_GREEN,
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

export const setFieldShipIndexAction = (playground, index) => {
    return {
        type: SET_SHIP_INDEX,
        data: index,
        playground: playground
    }
};

export const FIELD_TYPES = {
    PLAYGROUND: 0,
    OVERLAY: 1
};
