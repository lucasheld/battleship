import React, { Component } from "react";
import Identicon from 'react-identicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

export default class PlayerProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identiconSeed: Math.floor((Math.random() * 100) + 1)
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

    render() {
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
                        <input className="input" type="text" placeholder="Enter your name" value={this.props.playerName}/>
                    </td>
                </tr>
                <tr>
                    <th className="is-vcentered">Pin</th>
                    <td>
                        <input className="input" type="password" placeholder="Enter your pin" value={this.props.playerPin}/>
                    </td>
                </tr>
                <tr>
                    <th className="is-vcentered">Avatar</th>
                    <td>
                        <Identicon string={this.state.identiconSeed} size="100" />
                        <div className="columns">
                            <div className="column is-one-quarter"/>
                            <div className="column">
                                <button className="button is-small" onClick={() => this.decreaseSeed()}>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </button>
                            </div>
                            <div className="column">
                                <button className="button is-small" onClick={() => this.increaseSeed()}>
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
                        <button className="button is-dark">Speichern</button>
                    </td>
                </tr>
                </tfoot>
            </table>
        );
    }
}
