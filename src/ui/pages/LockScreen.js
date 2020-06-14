import React, {Component} from "react";
import {Redirect} from "react-router-dom/";
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/lock-mapper";
import {MODES} from "../../redux/actions/mode-action";

class LockScreen extends Component {
    constructor(props) {
        super(props);
        this.player = this.getPlayer();
        this.props.setNoFire(false);
        this.state = {
            redirect: false,
            playerPin: ""
        }
    }

    getPlayer = () => {
        return this.props.players.filter(player => player.id === this.props.activePlayerId)[0];
    };

    triggerRedirect = () => {
        let pinCorrect = true;
        if (!pinCorrect) {
            return;
        }
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

    render() {
        if (this.state.redirect) {
            if (this.state.redirect) {
                if (this.props.activePlayerId === 0) {
                    return this.props.mode === MODES.STRATEGY ? <Redirect to="/strategy-mode/0"/> :
                        <Redirect to="/fight-mode/0"/>;
                } else if (this.props.activePlayerId === 1) {
                    return this.props.mode === MODES.STRATEGY ? <Redirect to="/strategy-mode/1"/> :
                        <Redirect to="/fight-mode/1"/>;
                } else {
                    return <Redirect to="/setup"/>;
                }
            }
        }

        return (
            <div className="columns is-centered">
                <div className="column card is-one-third">
                    <h2 className="subtitle">Hallo {this.player.nick}!</h2>
                    {(this.props.isFirstRound && this.props.mode === MODES.BATTLE) &&
                    <h2 className="subtitle">Die <span role="img" aria-label="Würfel">&#127922; &#127922;</span> sind
                        gefallen. Du darfst beginnen!</h2>}
                    <h2 className="subtitle">Um fortzufahren, gib hier deinen PIN ein</h2>
                    <div className="field">
                        <div className="control">
                            <input className="input is-focused" type="password" name="playerPin"
                                   placeholder="Enter your pin" value={this.state.playerPin}
                                   onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-dark" disabled={this.state.playerPin !== this.player.pin}
                                    onClick={this.triggerRedirect}>
                                {this.props.mode === MODES.STRATEGY ? "Strategiemodus" : "Kampfmodus"} betreten
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(LockScreen);
