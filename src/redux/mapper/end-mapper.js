export function mapStateToProps(state) {
    return {
        activePlayerId: state.activePlayerReducer,
        players: state.playerReducer
    }
}
