import React, { Component } from "react";
import Playground from "../components/Playground";
import {player0} from "../../cross-cutting/game";

export default class StrategyModeScreen extends Component {
    render() {
        return (
            <div>
                StrategyModeScreen
                <Playground player={player0}/>
            </div>
        );
    }
}
