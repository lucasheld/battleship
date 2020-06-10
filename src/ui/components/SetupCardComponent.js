import React, {Component} from "react";
import Identicon from "react-identicons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'

export default class SetupCardComponent extends Component {
    render() {
        return (
            <div className="column is-one-quarter">
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-1by1">
                            <Identicon string={this.props.identiconSeed} size="200"/>
                        </figure>
                    </div>
                    <div className="card-content">
                        <h1 className="title">{this.props.playerName}</h1>
                        { this.props.playerReady ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faTimes}/> }
                    </div>
                </div>
            </div>
        )
    }
}
