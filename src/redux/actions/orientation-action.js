export const ADD_ORIENTATION = "ADD_ORIENTATION";

/**
 * Sets the orientation of a ship.
 * @param playground: The playground that holds the ship
 * @param orientation: The orientation of the ship
 * @param name: The name of the ship
 * @param id: The id of the ship
 * @returns {{data: {orientation: *, name: *, id: *}, playground: *, type: string}}
 */
export const setOrientationAction = (playground, orientation, name, id) => {
    return {
        type: ADD_ORIENTATION,
        data: {
            orientation: orientation,
            name: name,
            id: id
        },
        playground: playground
    }
};
