import React, { Component } from "react";
import PasswordProtectionDialog from "../components/PasswordProtectionDialog";

export default class LockScreen extends Component {
    render() {
        return (
            <div>
                <PasswordProtectionDialog playerName="Lucas" mode="fight"/>
                <br/>
                <PasswordProtectionDialog playerName="Keanu" mode="strategy" firstRound={true}/>
            </div>
        );
    }
}
