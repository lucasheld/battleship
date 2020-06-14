import React, {Component} from "react";
import Identicon from "react-identicons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/setup-mapper";
import {MODES} from "../../redux/actions/mode-action";

/**
 * Component for a setup card.
 */
class SetupCardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    /**
     * Is called if the card is clicked.
     */
    triggerRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    render() {
        // Redirects to lock
        // Set strategy mode to later redirect to strategy mode screen
        // Sets the clicked player as active
        if (this.state.redirect) {
            this.props.setMode(MODES.STRATEGY);
            this.props.setActivePlayer(this.props.playerId);
            return <Redirect to="/lock"/>;
        }

        // Render the card green and the check icon when player is ready (set all ships in strategy mode)
        // Otherwise set red and cross icon
        return (
            <div className="column is-one-quarter" onClick={this.triggerRedirect}>
                <div className="card" style={{backgroundColor: this.props.playerReady ? '#d6e3bd' : '#f4d8db'}}>
                    <div className="card-image">
                        <figure className="image is-1by1">
                            <Identicon string={this.props.identiconSeed} size="200"/>
                        </figure>
                    </div>
                    <div className="card-content">
                        <h1 className="title">{this.props.playerName}</h1>
                        {this.props.playerReady ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faTimes}/>}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(SetupCardComponent);
