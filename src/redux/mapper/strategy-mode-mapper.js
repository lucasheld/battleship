export function mapStateToProps(state) {
    return {
        players: state.playerReducer
    }
}
