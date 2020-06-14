export const ADD_ORIENTATION = "ADD_ORIENTATION";

export const setOrientationAction = (orientation, name, id) => {
    return {
        type: ADD_ORIENTATION,
        data: {
            orientation: orientation,
            name: name,
            id: id
        },
    }
};
