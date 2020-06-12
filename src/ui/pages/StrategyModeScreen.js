import React, {Component} from "react";
import Playground from "../components/Playground";
import Ship from "../components/Ship";
import {Redirect} from "react-router-dom";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/strategy-mode-mapper";
import {connect} from "react-redux";

class StrategyModeScreen extends Component {
    constructor(props) {
        super(props);
        this.playerId = Number(this.props.match.params.playerId);
        this.player = this.getPlayer();
        this.state = {
            redirect: false
        }
    }

    triggerRedirect = () => {
        this.props.setPlayerReady({id: this.playerId});
        this.setState({
            redirect: true
        })
    };

    getPlayer = () => {
        return this.props.players.filter(player => player.id === this.playerId)[0];
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/setup" />;
        }

        return (
            <div className="columns">
                <div className="column">
                    <Playground player={this.player}/>
                    <br/>
                    <div className="control">
                        <label className="label">
                            <button className="button is-dark" onClick={this.triggerRedirect}>Fertig</button>
                        </label>
                    </div>
                </div>
                <div className="column">
                    <div className="columns is-centered">
                        <Ship id="battleship1" shipLength={5} shipName="Schlachtschiff"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="cruiser0" shipLength={4} shipName="Kreuzer"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="cruiser1" shipLength={4} shipName="Kreuzer" disabled={true}/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="destroyer0" shipLength={3} shipName="Zerstörer" selected={true}/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="destroyer1" shipLength={3} shipName="Zerstörer"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="destroyer2" shipLength={3} shipName="Zerstörer"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="submarine0" shipLength={2} shipName="U-Boot"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="submarine1" shipLength={2} shipName="U-Boot"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="submarine2" shipLength={2} shipName="U-Boot"/>
                    </div>
                    <div className="columns is-centered">
                        <Ship id="submarine3" shipLength={2} shipName="U-Boot"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(StrategyModeScreen);
