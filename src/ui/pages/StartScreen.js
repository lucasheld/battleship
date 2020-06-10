import React, { Component } from "react";
import "./StartScreen.css";

export default class StartScreen extends Component {
    render() {
        return (
            <div>
                <h1>Seeschlacht</h1>
                <h2>Version 20.1.7</h2>
                <h2>Werde Herrscher(in) über die Meere</h2>
                <br/>
                <br/>
                <button onClick={() => this.props.history.push('/playerProfile')}>Neues Spiel</button>
            </div>
        );
    }
}
