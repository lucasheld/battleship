import React, {Component} from "react";
import Identicon from 'react-identicons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {Link, Redirect} from "react-router-dom"
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/player-profile-mapper";
import Player from "../../redux/data-classes/player";
import {player0default, player1default} from "../../redux/reducers/player-reducer";

const NICK_MIN_LENGTH = 3;
const PIN_LENGTH = 4;

/**
 * Component for the player profile screen.
 */
class PlayerProfileScreen extends Component {
    constructor(props) {
        super(props);
        // Player id from the url params
        this.playerId = Number(this.props.match.params.playerId);
        this.player = this.getPlayer();
        // Is true when a player is in initial state of the player reducer
        this.playerIsDefault = this.player === player0default || this.player === player1default;
        this.state = {
            redirect: false,
            identiconSeed: this.player.avatar,
            playerName: "",
            playerPin: ""
        };
    }

    /**
     * Decreases the seed for drawing the identicon
     */
    decreaseSeed = () => {
        this.setState({
            identiconSeed: this.state.identiconSeed - 1
        })
    };

    /**
     * Increases the seed for drawing the identicon
     */
    increaseSeed = () => {
        this.setState({
            identiconSeed: this.state.identiconSeed + 1
        })
    };

    /**
     * Is called if the save button is clicked.
     */
    triggerRedirect = () => {
        this.setPlayer();
        this.setState({
            redirect: true
        })
    };

    /**
     * Handles the pin/nick field inputs and writes them in a state
     * @param event
     */
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    /**
     * Saves player changes before redirect.
     * @returns {*}
     */
    setPlayer = () => {
        let p = new Player(this.playerId, this.state.playerName, this.state.playerPin, this.state.identiconSeed);
        this.props.changePlayer(p);
    };

    /**
     * Save button is disabled as long as there are no inputs
     * Pin has to be PIN_LENGTH long
     * Nick has at least to be NICK_MIN_LENGTH long
     * @returns {boolean}
     */
    isSaveDisabled = () => {
        return this.state.playerName === "" || this.state.playerPin === "" || this.state.playerPin.length !== PIN_LENGTH || this.state.playerName.length < NICK_MIN_LENGTH;
    };

    /**
     * Returns the player.
     * @returns {*}
     */
    getPlayer = () => {
        return this.props.players.filter(player => player.id === this.playerId)[0];
    };

    /**
     * Gets the old pin if there is one
     * @returns {element}
     */
    getOldNick = () => {
        if (!this.playerIsDefault) {
            return (
                <tr>
                    <th colSpan={2} className="is-vcentered">Old nick: {this.player.nick}</th>
                </tr>
            );
        }
    };

    /**
     * Gets the old pin if there is one
     * Shows only last and first character and the rest as *
     * @returns {element}
     */
    getOldPin = () => {
        if (!this.playerIsDefault) {
            return (
                <tr>
                    <th colSpan={2} className="is-vcentered">Old
                        pin: {this.player.pin.replace(/(?<!^).(?!$)/g, '*')}</th>
                </tr>
            );
        }
    };

    render() {
        if (this.state.redirect) {
            // When reaching this screen from ingame leave it also to ingame!
            if (this.props.match.params.ingame) {
                return this.playerId === 0 ? <Redirect to="/fight-mode/0"/> : <Redirect to="/fight-mode/1"/>;
            }
            // Redirect to next player profile or when you are there redirect to setup
            if (this.playerId === 0) {
                return <Redirect to="/player-profile/1"/>;
            } else {
                return <Redirect to="/setup"/>;
            }
        }

        return (
            <div>
                <div className="columns">
                    <div className="column is-one-third has-text-left">
                        <div className="title">Spielerprofil</div>
                    </div>
                    <div className="column"/>
                    <div className="column is-one-third has-text-right">
                        {
                            this.props.match.params.ingame &&
                            (this.playerId === 0 ?
                                <Link to="/fight-mode/0" className="button is-dark">Zurück zum Kampfmodus</Link>
                                : <Link to="/fight-mode/1" className="button is-dark">Zurück zum Kampfmodus</Link>)
                        }
                    </div>
                </div>

                <table className="table">
                    <thead>
                    <tr>
                        <th colSpan="2">Spieler {this.playerId + 1}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th className="is-vcentered">Nick</th>
                        <td>
                            <div className="field">
                                <div className="control">
                                    <input className="input" type="text" name="playerName" placeholder="Enter your name"
                                           value={this.state.playerName} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                        </td>
                    </tr>
                    {this.getOldNick()}
                    <tr>
                        <th className="is-vcentered">Pin</th>
                        <td>
                            <div className="field">
                                <div className="control">
                                    <input className="input" type="password" name="playerPin"
                                           placeholder="Enter your pin" value={this.state.playerPin}
                                           onChange={this.handleInputChange}/>
                                </div>
                            </div>
                        </td>
                    </tr>
                    {this.getOldPin()}
                    <tr>
                        <th className="is-vcentered">Avatar</th>
                        <td>
                            <Identicon string={this.state.identiconSeed} size="100"/>
                            <div className="columns">
                                <div className="column is-one-quarter"/>
                                <div className="column">
                                    <button className="button is-small" onClick={this.decreaseSeed}>
                                        <FontAwesomeIcon icon={faAngleLeft}/>
                                    </button>
                                </div>
                                <div className="column">
                                    <button className="button is-small" onClick={this.increaseSeed}>
                                        <FontAwesomeIcon icon={faAngleRight}/>
                                    </button>
                                </div>
                                <div className="column is-one-quarter"/>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="2">
                            <button className="button is-dark" disabled={this.isSaveDisabled()}
                                    onClick={this.triggerRedirect}>Speichern
                            </button>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }

}

export default connect(mapStateToProps, matchDispatchToProps)(PlayerProfileScreen);
