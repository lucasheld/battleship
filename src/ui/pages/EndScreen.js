import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/mapper/end-mapper";

class EndScreen extends Component {
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
    };

    getInactivePlayer = () => {
        return this.props.players.filter(player => player.id !== this.props.activePlayerId)[0];
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }

        let winnerName = this.getInactivePlayer().nick;

        return (
            <div>
                <h1 className="title">Glückwunsch!</h1>
                <h2 className="subtitle">Hey {winnerName}, du hast gewonnen.</h2>
                <button className="button is-dark" onClick={this.triggerRedirect}>Neues Spiel?</button>
            </div>
        );
    }
}

export default connect(mapStateToProps)(EndScreen);
