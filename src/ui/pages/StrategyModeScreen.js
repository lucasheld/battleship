import React, {Component} from "react";
import Playground from "../components/Playground";
import {player0} from "../../cross-cutting/game";
import Ship from "../components/Ship";
import {Redirect} from "react-router-dom";

export default class StrategyModeScreen extends Component {
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
            return <Redirect push to="/setup" />;
        }

        return (
            <div className="columns">
                <div className="column">
                    <Playground player={player0}/>
                    <br/>
                    <div className="control">
                        <label className="label">
                            <button className="button is-dark" onClick={this.triggerRedirect}>Fertig</button>
                        </label>
                    </div>
                </div>
                <div className="column">
                    <div className="columns is-centered">
                        <Ship id="battleship1" shipLength="5" shipName="Schlachtschiff"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="cruiser0" shipLength="4" shipName="Kreuzer"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="cruiser1" shipLength="4" shipName="Kreuzer" disabled={true}/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="destroyer0" shipLength="3" shipName="Zerstörer" selected={true}/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="destroyer1" shipLength="3" shipName="Zerstörer"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="destroyer2" shipLength="3" shipName="Zerstörer"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="submarine0" shipLength="2" shipName="U-Boot"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="submarine1" shipLength="2" shipName="U-Boot"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="submarine2" shipLength="2" shipName="U-Boot"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="submarine3" shipLength="2" shipName="U-Boot"/>
                    </div>
                </div>
            </div>
        );
    }
}
