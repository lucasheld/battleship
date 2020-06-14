/**
 * Maps listed states to props
 * @param state: The entire Redux store state
 * @returns {{orient: orientationReducer}}
 */
export function mapStateToProps(state) {
    return {
        orient: state.orientationReducer
    }
}
