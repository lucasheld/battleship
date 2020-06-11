import React, { Component } from "react";
import Identicon from 'react-identicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import "./PlayerProfileScreen.css"
import { Redirect } from "react-router-dom"

export default class PlayerProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            identiconSeed: Math.floor((Math.random() * 100) + 1),  // random int between 1 and 100
            playerName: "",
            playerPin: ""
        }
    }

    decreaseSeed = () => {
        this.setState({
            identiconSeed: this.state.identiconSeed - 1
        })
    }

    increaseSeed = () => {
        this.setState({
            identiconSeed: this.state.identiconSeed + 1
        })
    }

    triggerRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/setup" />;
        }

        return (
            <table className="table">
                <thead>
                <tr>
                    <th colSpan="2">Spieler {this.props.playerNumber}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th className="is-vcentered">Nick</th>
                    <td>
                        <input className="input" type="text" name="playerName" placeholder="Enter your name" value={this.state.playerName} onChange={this.handleInputChange}/>
                    </td>
                </tr>
                <tr>
                    <th className="is-vcentered">Pin</th>
                    <td>
                        <input className="input" type="password" name="playerPin" placeholder="Enter your pin" value={this.state.playerPin} onChange={this.handleInputChange}/>
                    </td>
                </tr>
                <tr>
                    <th className="is-vcentered">Avatar</th>
                    <td>
                        <Identicon string={this.state.identiconSeed} size="100" />
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
                        <button className="button is-dark" onClick={this.triggerRedirect}>Speichern</button>
                    </td>
                </tr>
                </tfoot>
            </table>
        );
    }
}
