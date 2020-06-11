import React, { Component } from "react";
import { Redirect } from "react-router-dom"

export default class EndScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    triggerRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/player-profile/0" />;
        }

        return (
            <div>
                <h1 className="title">Glückwunsch!</h1>
                <h2 className="subtitle">Hey {this.props.winner}, du hast gewonnen.</h2>
                <button className="button is-dark" onClick={this.triggerRedirect}>Neues Spiel?</button>
            </div>
        );
    }
}
