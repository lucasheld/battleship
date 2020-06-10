import React, { Component } from "react";
import Identicon from 'react-identicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import "./SetupScreen.css";

export default class SetupScreen extends Component {
    render() {
        return (
            <div>
                <div className="columns is-centered has-text-centered">
                    <div className="column is-one-quarter">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-1by1">
                                    <Identicon string="1" size="200" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <h1 className="title">Keanu</h1>
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                        </div>
                    </div>
                    <div className="column is-one-quarter">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-1by1">
                                    <Identicon string="2" size="200" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <h1 className="title">Lucas</h1>
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="button is-dark is-large" onClick={() => this.props.history.push('/strategy-mode')}>Seeschlacht beginnen</button>
            </div>
        );
    }
}
