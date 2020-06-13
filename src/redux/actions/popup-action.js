export const OPEN_POPUP = "OPEN_POPUP";

export const openPopupAction = (status) => {
    return {
        type: OPEN_POPUP,
        data: status
    }
};
