import React, {Component} from "react";
import "./SetupScreen.css";
import SetupCardComponent from "../components/SetupCardComponent";
import { Redirect } from "react-router-dom"
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/setup-mapper";
import {MODES} from "../../redux/actions/mode-action";

class SetupScreen extends Component {
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

    isStartDisabled = () => {
        return this.props.players.filter(player => !player.ready).length !== 0;
    };

    render() {
        if (this.state.redirect) {
            this.props.setMode(MODES.BATTLE);
            this.props.setActivePlayer(Math.round(Math.random()));
            return <Redirect to="/lock" />;
        }

        return (
            <div>
                <div className="columns is-centered has-text-centered">
                    {this.props.players.map((player) => {
                        return <SetupCardComponent
                            key={"player" + player.id}
                            playerName={player.nick}
                            playerId={player.id}
                            playerReady={player.ready}
                            identiconSeed={player.avatar}
                        />
                    })}
                </div>
                <button className="button is-dark is-large"
                        disabled={this.isStartDisabled()}
                        onClick={this.triggerRedirect}>Seeschlacht beginnen
                </button>
            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(SetupScreen);
