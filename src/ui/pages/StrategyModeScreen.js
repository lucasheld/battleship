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
                    {this.props.ships.map( ship =>
                        <div key={ship.name.toLowerCase() + ship.id} className="columns is-centered">
                            <Ship id={ship.name.toLowerCase() + ship.id} shipLength={ship.size} shipName={ship.name}/>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(StrategyModeScreen);
