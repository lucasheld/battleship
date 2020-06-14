import React, {Component} from "react";
import Playground from "../components/Playground";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/fight-mode-mapper";
import {connect} from "react-redux";
import {PLAYGROUND_TYPE} from "../../redux/reducers/field-reducer";
import {Link, Redirect} from "react-router-dom";

class FightModeScreen extends Component {
    constructor(props) {
        super(props);
        this.myPlayer = this.getMyPlayer();
        this.otherPlayer = this.getOtherPlayer();
        this.props.setActivePlayer(this.myPlayer.id === 0 ? 1 : 0);
        this.unsetFirstRound();
        this.props.setShipDraggable(false);
        this.paintEverythingGreen();
        this.state = {
            redirect: false,
        }
    }

    paintEverythingGreen = () => {
        this.props.setFieldColorGreen(PLAYGROUND_TYPE.PLAYER1FULL);
        this.props.setFieldColorGreen(PLAYGROUND_TYPE.PLAYER2FULL);
    };

    triggerRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    getMyPlayer = () => {
        return this.props.players.filter(player => player.id === this.props.activePlayerId)[0];
    };

    getOtherPlayer = () => {
        return this.props.players.filter(player => player.id !== this.props.activePlayerId)[0];
    };

    unsetFirstRound = () => {
        if(this.props.isFirstRound) {
            this.props.setFirstRound(false);
        }
    };

    checkWinner = () => {
        let playground = this.myPlayer.id === 0 ? PLAYGROUND_TYPE.PLAYER2FULL : PLAYGROUND_TYPE.PLAYER1FULL;
        return !this.props.fields[playground].filter(field => field.color === "field-valid" || field.color === "field-blocked")[0];
    };

    render() {
        if(this.checkWinner()) {
            return <Redirect to="/end" />;
        } else if (this.state.redirect) {
            return <Redirect to="/lock" />;
        }

        let myPlayground = this.myPlayer.id === 0 ? PLAYGROUND_TYPE.PLAYER1FULL : PLAYGROUND_TYPE.PLAYER2FULL;
        let otherPlayground = this.myPlayer.id === 0 ? PLAYGROUND_TYPE.PLAYER2PART : PLAYGROUND_TYPE.PLAYER1PART;

        return (
            <div>
                <div className="columns">
                    <div className="column is-one-third has-text-left">
                        <div className="title">Kampfmodus</div>
                    </div>
                    <div className="column"/>
                    <div className="column is-one-third has-text-right">
                        <Link to={"/player-profile/" + this.myPlayer.id + "/ingame"} className="button is-dark">
                            Spielerprofil bearbeiten
                        </Link>
                    </div>
                </div>

                <h3 className="subtitle">
                    Hallo {this.myPlayer.nick}
                    <br/>
                    Willkommen zurück in der Kommandozentrale
                    <br/>
                </h3>
                <div className="columns">
                    <div className="column">
                        <h4 className="subtitle">
                            Das Meer von {this.otherPlayer.nick}
                        </h4>
                        <Playground player={this.otherPlayer} playground={otherPlayground} />
                        <br/>
                    </div>
                    <div className="column">
                        <div className="column">
                            <h4 className="subtitle">
                                Dein Meer
                            </h4>
                            <Playground player={this.myPlayer} playground={myPlayground} />
                            <br/>
                        </div>
                    </div>
                </div>
                <div className="control">
                    <label className="label">
                        <button className="button is-dark" disabled={!this.props.noFire} onClick={this.triggerRedirect}>Zug beenden</button>
                    </label>
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(FightModeScreen);
