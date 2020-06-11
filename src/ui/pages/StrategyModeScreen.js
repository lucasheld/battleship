import React, {Component} from "react";
import Playground from "../components/Playground";
import {player0} from "../../cross-cutting/game";
import Ship from "../components/Ship";

export default class StrategyModeScreen extends Component {
    render() {
        return (
            <div>
                StrategyModeScreen
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <Playground player={player0}/>
                        </td>
                        <td>
                            <table>
                                <tr>
                                    <td>
                                        <Ship id="battleship" shipLength="5" shipName="Schlachtschiff"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Ship id="cruiser0" shipLength="4" shipName="Kreuzer"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Ship id="cruiser1" shipLength="4" shipName="Kreuzer"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Ship id="destroyer0" shipLength="3" shipName="Zerstörer"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Ship id="destroyer1" shipLength="3" shipName="Zerstörer"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Ship id="destroyer2" shipLength="3" shipName="Zerstörer"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Ship id="submarine0" shipLength="2" shipName="U-Boot"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Ship id="submarine1" shipLength="2" shipName="U-Boot"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Ship id="submarine2" shipLength="2" shipName="U-Boot"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Ship id="submarine3" shipLength="2" shipName="U-Boot"/>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
