export function mapStateToProps(state) {
    return {
        test: state.testState,
        activePlayer: state.activePlayerState
    }
}
