import React, {Component} from "react";
import Playground from "../components/Playground";
import {player0, player1} from "../../cross-cutting/game";
import Redirect from "react-router-dom/es/Redirect";

export default class FightModeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    triggerRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/setup"/>;
        }

        return (
            <div>
                <h2>Kampfmodus</h2>
                <br/>
                <p>
                    Hallo {player0.nick}
                    <br/>
                    Willkommen zurück in der Kommandozentrale
                    <br/>
                </p>
                <div className="columns">
                    <div className="column">
                        <p>
                            Das Meer von {player1.nick}
                        </p>
                        <br/>
                        <Playground player={player1}/>
                        <br/>
                    </div>
                    <div className="column">
                        <div className="column">
                            <p>
                                Dein Meer
                            </p>
                            <br/>
                            <Playground player={player0}/>
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
