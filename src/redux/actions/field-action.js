export var SET_COLOR = "SET_COLOR";
export var SET_COLOR_GREEN = "SET_COLOR_GREEN";
export var ADD_FIELD = "ADD_FIELD";
export var SET_SHIP_INDEX = "SET_SHIP_INDEX";

/**
 * Changes the field color.
 * @param playground: The playground that holds the field
 * @param id: The field id
 * @param color: The new field color
 * @returns {{data: *, playground: *, type: string}}
 */
export const setFieldColorAction = (playground, id, color) => {
    return {
        type: SET_COLOR,
        data: {
            id: id,
            color: color
        },
        playground: playground
    }
};

/**
 * Changes the color of all fields to green.
 * @param playground: The playground that holds the fields
 * @returns {{playground: *, type: string}}
 */
export const setFieldColorGreenAction = (playground) => {
    return {
        type: SET_COLOR_GREEN,
        playground: playground
    }
};


/**
 * Adds a field.
 * @param playground: The playground that holds the field
 * @param field: The new field
 * @returns {{data: *, playground: *, type: string}}
 */
export const addFieldAction = (playground, field) => {
    return {
        type: ADD_FIELD,
        data: field,
        playground: playground
    }
};

/**
 * Sets an index for a field within a ship.
 * @param playground: The playground that holds the field
 * @param id: The field id
 * @param index: The field index within the ship
 * @returns {{data: {index: *, id: *}, playground: *, type: string}}
 */
export const setShipFieldIndexAction = (playground, id, index) => {
    return {
        type: SET_SHIP_INDEX,
        data: {
            id: id,
            index: index
        },
        playground: playground
    }
};

/**
 * Types of different fields.
 * @type {{PLAYGROUND: number, TEXT: number, OVERLAY: number}}
 */
export const FIELD_TYPES = {
    TEXT: 0,
    PLAYGROUND: 1,
    OVERLAY: 2
};
