import React, {Component} from "react";
import Playground from "../components/Playground";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/fight-mode-mapper";
import {connect} from "react-redux";
import {playgroundType} from "../../redux/reducers/field-reducer";
import Redirect from "react-router-dom/es/Redirect";

class FightModeScreen extends Component {
    constructor(props) {
        super(props);
        this.myPlayer = this.getMyPlayer();
        this.otherPlayer = this.getOtherPlayer();
        this.unsetFirstRound();
        this.props.setShipDraggable(false);
        this.state = {
            redirect: false,
        }
    }

    triggerRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    getMyPlayer = () => {
        return this.props.players.filter(player => player.id === this.props.activePlayerId)[0];
    };

    getOtherPlayer = () => {
        return this.props.players.filter(player => player.id !== this.props.activePlayerId)[0];
    };

    unsetFirstRound = () => {
        if(this.props.isFirstRound) {
            this.props.setFirstRound(false);
        }
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/setup" />;
        }

        let myPlayground = this.myPlayer.id === 0 ? playgroundType.PLAYER1FULL : playgroundType.PLAYER2FULL;
        let otherPlayground = this.myPlayer.id === 0 ? playgroundType.PLAYER2PART : playgroundType.PLAYER1PART;

        return (
            <div>
                <h1 className="title">Kampfmodus</h1>
                <br/>
                <h3 className="subtitle">
                    Hallo {this.myPlayer.nick}
                    <br/>
                    Willkommen zurück in der Kommandozentrale
                    <br/>
                </h3>
                <div className="columns">
                    <div className="column">
                        <h4 className="subtitle">
                            Das Meer von {this.otherPlayer.nick}
                        </h4>
                        <Playground player={this.otherPlayer} playground={otherPlayground} />
                        <br/>
                    </div>
                    <div className="column">
                        <div className="column">
                            <h4 className="subtitle">
                                Dein Meer
                            </h4>
                            <Playground player={this.myPlayer} playground={myPlayground} />
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

export default connect(mapStateToProps, matchDispatchToProps)(FightModeScreen);
