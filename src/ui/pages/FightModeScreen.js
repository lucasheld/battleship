import React, {Component} from "react";
import Playground from "../components/Playground";
import {Redirect} from "react-router-dom";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/fight-mode-mapper";
import {connect} from "react-redux";

class FightModeScreen extends Component {
    constructor(props) {
        super(props);
        this.unsetFirstRound();
        this.state = {
            redirect: false
        }
    }

    triggerRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    unsetFirstRound = () => {
        if(this.props.isFirstRound) {
            this.props.setFirstRound(false);
        }
        console.log(this.props.isFirstRound)
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/setup" />;
        }

        return (
            <div>
                <h2>Kampfmodus</h2>
                <br/>
                <p>
                    Hallo {null/*.nick TODO*/}
                    <br/>
                    Willkommen zurück in der Kommandozentrale
                    <br/>
                </p>
                <div className="columns">
                    <div className="column">
                        <p>
                            Das Meer von {null/*.nick TODO*/}
                        </p>
                        <br/>
                        <Playground player={null/*TODO*/}/>
                        <br/>
                    </div>
                    <div className="column">
                        <div className="column">
                            <p>
                                Dein Meer
                            </p>
                            <br/>
                            <Playground player={null/*TODO*/}/>
                            <br/>
                        </div>
                    </div>
                </div>
                <div className="control">
                    <label className="label">
                        <button className="button is-dark" onClick={this.triggerRedirect}>Zug beenden</button>
                    </label>
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(FightModeScreen);
