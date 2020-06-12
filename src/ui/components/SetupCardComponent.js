import React, {Component} from "react";
import Identicon from "react-identicons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
import { Redirect } from "react-router-dom"
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/setup-mapper";
import {MODES} from "../../redux/actions/mode-action";

class SetupCardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    triggerRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    render() {
        if (this.state.redirect) {
            this.props.setMode(MODES.STRATEGY);
            this.props.setActivePlayer(this.props.playerId);
            return <Redirect push to="/lock" />;
        }

        return (
            <div className="column is-one-quarter" onClick={this.triggerRedirect}>
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

export default connect(mapStateToProps, matchDispatchToProps)(SetupCardComponent);
