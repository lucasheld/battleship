export var SET_COLOR = "SET_COLOR";
export var ADD_FIELD = "ADD_FIELD";

export const setFieldColorAction = (id) => {
    return {
        type: SET_COLOR,
        data: id,
    }
};

export const addFieldAction = (field) => {
    return {
        type: ADD_FIELD,
        data: field,
    }
};

export const FIELD_TYPES = {
    TEXT: 0,
    PLAYGROUND: 1,
    SHIP: 2
};
