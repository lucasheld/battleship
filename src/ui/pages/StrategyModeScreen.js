import React, { Component } from "react";
import Playground from "../components/Playground";
import {player0} from "../../cross-cutting/game";
import Ship from "../components/Ship";

export default class StrategyModeScreen extends Component {
    render() {
        return (
            <div className="columns">
                <div className="column">
                    <Playground player={player0}/>
                </div>
                <div className="column">
                    <div className="columns is-centered">
                        <Ship id="battleship1" shipLength="5" shipName="Schlachtschiff"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="cruiser0" shipLength="4" shipName="Kreuzer"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="cruiser1" shipLength="4" shipName="Kreuzer"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="destroyer0" shipLength="3" shipName="Zerstörer"/>
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
