import React, { Component } from "react";
import Playground from "../components/Playground";
import {player0} from "../../cross-cutting/game";
import Ship from "../components/Ship";

export default class StrategyModeScreen extends Component {
    render() {
        return (
            <div>
                StrategyModeScreen
                <Playground player={player0}/>
                <div className="columns is-centered has-text-left">
                    <Ship id="battleship1" shipLength="5" shipName="Schlachtschiff"/>
                    <Ship id="cruiser0" shipLength="4" shipName="Kreuzer"/>
                    <Ship id="cruiser1" shipLength="4" shipName="Kreuzer"/>
                    <Ship id="destroyer0" shipLength="3" shipName="Zerstörer"/>
                    <Ship id="destroyer1" shipLength="3" shipName="Zerstörer"/>
                    <Ship id="destroyer2" shipLength="3" shipName="Zerstörer"/>
                    <Ship id="submarine0" shipLength="2" shipName="U-Boot"/>
                    <Ship id="submarine1" shipLength="2" shipName="U-Boot"/>
                    <Ship id="submarine2" shipLength="2" shipName="U-Boot"/>
                    <Ship id="submarine3" shipLength="2" shipName="U-Boot"/>
                </div>

            </div>
        );
    }
}
