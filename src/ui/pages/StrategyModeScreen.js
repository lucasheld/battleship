import React, {Component} from "react";
import Playground from "../components/Playground";
import Ship from "../components/Ship";
import {Redirect} from "react-router-dom";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/strategy-mode-mapper";
import {connect} from "react-redux";
import ShipDirectionDialog from "../components/ShipDirectionDialog";
import {PLAYGROUND_TYPE} from "../../redux/reducers/field-reducer";

class StrategyModeScreen extends Component {
    constructor(props) {
        super(props);
        this.playerId = Number(this.props.match.params.playerId);
        this.player = this.getPlayer();
        this.playground = this.playerId === 0 ? PLAYGROUND_TYPE.PLAYER1FULL : PLAYGROUND_TYPE.PLAYER2FULL;
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

    isButtonDisabled = () => {
        let enabledShips = this.props.ships[this.playground].filter(ship => !ship.disabled);
        return enabledShips.length > 0;
    };

    onPopupMouseDown = (ship) => {
        if(!ship.disabled) {
            this.props.openPopup(true, ship);
        }
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/setup" />;
        }

        return (
            <div>
                <div className="columns">
                    <div className="column is-one-third has-text-left">
                        <div className="title">Strategiemodus</div>
                    </div>
                    <div className="column"/>
                    <div className="column is-one-third has-text-right"/>
                </div>
                <br/>

                <div className="columns">
                    <div className="column">
                        <Playground player={this.player} playground={this.playground}  />
                        <br/>
                        <div className="control">
                            <label className="label">
                                <button className="button is-dark" onClick={this.triggerRedirect} disabled={this.isButtonDisabled()}>Fertig</button>
                            </label>
                        </div>
                    </div>
                    <div className="column">
                        <ShipDirectionDialog playground={this.playground} enabled={this.props.popupOpen.enabled} ship={this.props.popupOpen.ship} index={this.props.popupOpen.index} />
                    </div>
                    <div className="column">
                        {this.props.ships[this.playground].map(ship =>
                            <div key={ship.name.toLowerCase() + "-" + ship.id} className="columns is-centered" onClick={() => this.onPopupMouseDown(ship)}>
                                <Ship playground={this.playground} id={ship.name.toLowerCase() + "-" + ship.id} ship={ship} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(StrategyModeScreen);
