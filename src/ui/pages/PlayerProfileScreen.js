import React, { Component } from "react";
import Identicon from 'react-identicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from "react-router-dom"
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/player-profile-mapper";
import Player from "../../redux/data-classes/player";

class PlayerProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.playerId = Number(this.props.match.params.playerId);
        this.player = this.getPlayer();
        this.state = {
            redirect: false,
            identiconSeed: Math.floor((Math.random() * 100) + 1),  // random int between 1 and 100
            playerName: "",
            playerPin: "",
            wasChanged: false
        };
    }

    decreaseSeed = () => {
        this.setState({
            identiconSeed: this.state.identiconSeed - 1,
            wasChanged: true
        })
    };

    increaseSeed = () => {
        this.setState({
            identiconSeed: this.state.identiconSeed + 1,
            wasChanged: true
        })
    };

    triggerRedirect = () => {
        this.setPlayer();
        this.setState({
            redirect: true
        })
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    setPlayer = () => {
        let p = new Player(this.playerId, this.state.playerName, this.state.playerPin, this.getAvatar());
        if(this.player !== undefined) {
            this.props.changePlayer(p);
            return;
        }
        this.props.addPlayer(p);
        this.props.setPlayerReady({id: this.playerId}); //TODO entfernen
    };

    getAvatar = () => {
        let seed = this.state.identiconSeed;
        if(this.player !== undefined && !this.state.wasChanged) {
            seed = this.player.avatar;
        }
        return seed;
    };

    isSaveDisabled = () => {
        return this.state.playerName === "" || this.state.playerPin === "" || this.state.playerPin.length < 1 || this.state.playerName.length < 1;
    };

    getPlayer = () => {
        return this.props.players.filter(player => player.id === this.playerId)[0];
    };

    getOldNick = () => {
        if (this.player !== undefined) {
            return (
                <tr>
                    <th colSpan={2} className="is-vcentered">Old nick: {this.player.nick}</th>
                </tr>
            );
        }
    };

    getOldPin = () => {
        if (this.player !== undefined) {
            return (
                <tr>
                    <th colSpan={2} className="is-vcentered">Old pin: {this.player.pin.replace(/(?<!^).(?!$)/g, '*')}</th>
                </tr>
            );
        }
    };

    render() {
        if (this.state.redirect) {
            if (this.playerId === 0) {
                return <Redirect push to="/player-profile/1" />;
            } else {
                return <Redirect push to="/setup" />;
            }
        }

        return (
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
                                <input className="input" type="text" name="playerName" placeholder="Enter your name" value={this.state.playerName} onChange={this.handleInputChange}/>
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
                                <input className="input" type="password" name="playerPin" placeholder="Enter your pin" value={this.state.playerPin} onChange={this.handleInputChange}/>
                            </div>
                        </div>
                    </td>
                </tr>
                {this.getOldPin()}
                <tr>
                    <th className="is-vcentered">Avatar</th>
                    <td>
                        <Identicon string={this.getAvatar()} size="100" />
                        <div className="columns">
                            <div className="column is-one-quarter"/>
                            <div className="column">
                                <button className="button is-small" onClick={this.decreaseSeed}>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </button>
                            </div>
                            <div className="column">
                                <button className="button is-small" onClick={this.increaseSeed}>
                                    <FontAwesomeIcon icon={faAngleRight} />
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
                        <button className="button is-dark" disabled={this.isSaveDisabled()} onClick={this.triggerRedirect}>Speichern</button>
                    </td>
                </tr>
                </tfoot>
            </table>
        );
    }

}

export default connect(mapStateToProps, matchDispatchToProps)(PlayerProfileScreen);
