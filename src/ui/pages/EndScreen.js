import React, { Component } from "react";

export default class EndScreen extends Component {
    render() {
        return (
            <div>
                <h1 className="title">Glückwunsch!</h1>
                <h2 className="subtitle">Hey {this.props.winner}, du hast gewonnen.</h2>
                <button className="button is-dark" onClick={() => this.props.history.push('/player-profile')}>Neues Spiel?</button>
            </div>
        );
    }
}
