import React, {Component} from "react";
import Redirect from "react-router-dom/es/Redirect";

export default class PasswordProtectionDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            playerPin: ""
        }
    }
    /* props
    playerName: player name
    mode: strategy or fight
    firstRound: true or false
     */

    triggerRedirect = () => {
        let pinCorrect = true;
        if (!pinCorrect) {
            return;
        }
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
            return this.props.mode === "strategy" ? <Redirect push to="/strategy-mode" /> : <Redirect push to="/fight-mode" />;
        }

        return (
            <div className="columns is-centered">
                <div className="column card is-one-third">
                    <h2 className="subtitle">Hallo {this.props.playerName}!</h2>
                    {this.props.firstRound && <h2 className="subtitle">Die &#127922; &#127922; sind gefallen. Du darfst beginnen!</h2>}
                    <h2 className="subtitle">Um fortzufahren, gib hier deinen PIN ein</h2>
                    <div className="field">
                        <div className="control">
                            <input className="input is-focused" type="password" name="playerPin" placeholder="Enter your pin" value={this.state.playerPin} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-dark" onClick={this.triggerRedirect}>
                                {this.props.mode === "strategy" ? "Strategiemodus" : "Kampfmodus"} betreten
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
