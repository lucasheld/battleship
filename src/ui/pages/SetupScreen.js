import React, {Component} from "react";
import "./SetupScreen.css";
import SetupCardComponent from "../components/SetupCardComponent";
import { Redirect } from "react-router-dom"
import {connect} from "react-redux";
import {mapStateToProps} from "../../redux/mapper/setup-mapper";

class SetupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            player1Ready: false,
            player2Ready: true,
        }
    }

    triggerRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    setPlayer1Ready = () => {
        this.setState({
            player1Ready: true
        })
    };

    setPlayer2Ready = () => {
        this.setState({
            player2Ready: true
        })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/fight-mode" />;
        }

        return (
            <div>
                <div className="columns is-centered has-text-centered">
                    {this.props.players.map((player) => {
                        return <SetupCardComponent key={"player" + player.id} playerName={player.nick} playerReady={this.state.player1Ready} identiconSeed={player.avatar} />
                    })}
                </div>
                <button className="button is-dark is-large"
                        disabled={!this.state.player1Ready || !this.state.player2Ready}
                        onClick={this.triggerRedirect}>Seeschlacht beginnen
                </button>
            </div>
        );
    }
}

export default connect(mapStateToProps)(SetupScreen);
