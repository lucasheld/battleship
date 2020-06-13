import React, {Component} from "react";
import Playground from "../components/Playground";
import Ship from "../components/Ship";
import {Redirect} from "react-router-dom";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/strategy-mode-mapper";
import {connect} from "react-redux";
import {playgroundType} from "../../redux/reducers/field-reducer";
import ShipDirectionDialog from "../components/ShipDirectionDialog";

class StrategyModeScreen extends Component {
    constructor(props) {
        super(props);
        this.playerId = Number(this.props.match.params.playerId);
        this.player = this.getPlayer();
        this.playground = this.playerId === 0 ? playgroundType.PLAYER1FULL : playgroundType.PLAYER2FULL;
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
        return false;

        let enabledShips = this.props.ships[this.playground].filter(ship => !ship.disabled);
        return enabledShips.length > 0;
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/setup" />;
        }

        return (
            <React.Fragment>
                <div className={"modal" + (this.props.popupOpen === true ? " is-active" : "")}>
                    <div className="modal-background" onClick={() => this.displayPopup(false)}/>
                    <div className="modal-content">
                        <ShipDirectionDialog playground={this.playground} />
                    </div>
                </div>

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
                        {this.props.ships[this.playground].map(ship =>
                            <div key={ship.name.toLowerCase() + "-" + ship.id} className="columns is-centered">
                                <Ship playground={this.playground} id={ship.name.toLowerCase() + "-" + ship.id} ship={ship} />
                            </div>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(StrategyModeScreen);
