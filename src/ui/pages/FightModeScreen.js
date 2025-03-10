import React, {Component} from "react";
import Playground from "../components/Playground";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/fight-mode-mapper";
import {connect} from "react-redux";
import {PLAYGROUND_TYPE} from "../../redux/reducers/field-reducer";
import {Link, Redirect} from "react-router-dom";

/**
 * Component for the fight mode screen.
 */
class FightModeScreen extends Component {
    constructor(props) {
        super(props);
        // Player id from the url params
        this.playerId = Number(this.props.match.params.playerId);
        this.myPlayer = this.getMyPlayer();
        this.otherPlayer = this.getOtherPlayer();
        // Sets the other player as active
        this.props.setActivePlayer(this.myPlayer.id === 0 ? 1 : 0);
        this.unsetFirstRound();
        // As we are in fight mode no longer cheating and dragging the ships is allowed!
        this.props.setShipsNotDraggable();
        this.paintEverythingGreen();
        this.state = {
            redirect: false,
        };
    }

    /**
     * Repaints the playgrounds from the purple blocked fields from strategy mode
     * to green valid fields for this mode
     */
    paintEverythingGreen = () => {
        this.props.setFieldColorGreen(PLAYGROUND_TYPE.PLAYER1FULL);
        this.props.setFieldColorGreen(PLAYGROUND_TYPE.PLAYER2FULL);
    };

    /**
     * Is called if the finish button is clicked.
     */
    triggerRedirect = () => {
        this.setState({
            redirect: true
        });
    };

    /**
     * Returns the own player.
     * @returns {*}
     */
    getMyPlayer = () => {
        return this.props.players.filter(player => player.id === this.playerId)[0];
    };

    /**
     * Returns the other player.
     * @returns {*}
     */
    getOtherPlayer = () => {
        return this.props.players.filter(player => player.id !== this.playerId)[0];
    };

    /**
     * Prevents the extra text in the lock screen
     */
    unsetFirstRound = () => {
        if (this.props.isFirstRound) {
            this.props.setFirstRound(false);
        }
    };

    /**
     * Checks if the playground of the other player has no valid fields anymore
     * @returns {boolean}
     */
    checkWinner = () => {
        let playground = this.myPlayer.id === 0 ? PLAYGROUND_TYPE.PLAYER2FULL : PLAYGROUND_TYPE.PLAYER1FULL;
        return !this.props.fields[playground].filter(field => field.color === "field-valid" || field.color === "field-blocked")[0];
    };

    render() {
        if (this.checkWinner()) {
            return <Redirect to="/end"/>;
        } else if (this.state.redirect) {
            return <Redirect to="/lock"/>;
        }

        // Id of the current players playground
        let myPlayground = this.myPlayer.id === 0 ? PLAYGROUND_TYPE.PLAYER1FULL : PLAYGROUND_TYPE.PLAYER2FULL;
        // Id of the other players playground copy
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
                        <Playground player={this.otherPlayer} playground={otherPlayground}/>
                        <br/>
                    </div>
                    <div className="column">
                        <h4 className="subtitle">
                            Dein Meer
                        </h4>
                        <Playground player={this.myPlayer} playground={myPlayground}/>
                        <br/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-dark" disabled={!this.props.noFire}
                                onClick={this.triggerRedirect}>Zug beenden
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(FightModeScreen);
