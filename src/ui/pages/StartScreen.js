import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import Player from "../../redux/data-classes/player";
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/start-mapper";

class StartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            doitonce: true // TODO delete this later on
        }
    }

    triggerRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/player-profile" />;
        }

        // Example TODO delete later
        if(this.state.doitonce){
            this.state.doitonce = false;
            this.props.addPlayer(new Player("1", "hi", "ho", "hu"));
            this.props.addPlayer(new Player("2", "hi2", "ho2", "hu2"));
            this.props.changePlayer(new Player("2", "hdbvfihuabgriu", "sekjngf", "wjnrg"));
        }
        console.log(this.props.players);

        return (
            <div>
                <h1 className="title">Seeschlacht</h1>
                <h2 className="subtitle">Version 20.1.7</h2>
                <h2>Werde Herrscher(in) über die Meere</h2>
                <br/>
                <button className="button is-dark" onClick={this.triggerRedirect}>Neues Spiel</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(StartScreen);
