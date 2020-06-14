/**
 * Maps listed states to props
 * @param state: The entire Redux store state
 * @returns {{players: playerReducer, activePlayerId: activePlayerReducer}}
 */
export function mapStateToProps(state) {
    return {
        activePlayerId: state.activePlayerReducer,
        players: state.playerReducer
    }
}
