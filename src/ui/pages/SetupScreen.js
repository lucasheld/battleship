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
    }

    setPlayer1Ready = () => {
        this.setState({
            player1Ready: true
        })
    }

    setPlayer2Ready = () => {
        this.setState({
            player2Ready: true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/fight-mode" />;
        }

        return (
            <div>
                {this.props.activePlayer !== null && this.props.activePlayer.name}
                <div className="columns is-centered has-text-centered">
                    <SetupCardComponent playerName="Keanu" playerReady={this.state.player1Ready} identiconSeed="1"/>
                    <SetupCardComponent playerName="Lucas" playerReady={this.state.player2Ready} identiconSeed="2"/>
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
