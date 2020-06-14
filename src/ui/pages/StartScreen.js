import React, {Component} from "react";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/start-mapper";

class StartScreen extends Component {
    constructor(props) {
        super(props);
        this.props.setInitialState();
        this.state = {
            redirect: false,
        }
    }

    triggerRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/player-profile/0"/>;
        }

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
