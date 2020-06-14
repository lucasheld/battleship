export const ADD_ORIENTATION = "ADD_ORIENTATION";

export const setOrientationAction = (id) => {
    return {
        type: ADD_ORIENTATION,
        data: id,
    }
};
