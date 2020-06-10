import React, { Component } from "react";

export default class StartScreen extends Component {
    render() {
        return (
            <div>
                <h1 className="title">Seeschlacht</h1>
                <h2 className="subtitle">Version 20.1.7</h2>
                <h2>Werde Herrscher(in) über die Meere</h2>
                <br/>
                <button className="button is-primary" onClick={() => this.props.history.push('/player-profile')}>Neues Spiel</button>
            </div>
        );
    }
}
