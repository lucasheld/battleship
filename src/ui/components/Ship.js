import React, {Component} from "react";
import Field from "./Field";

export default class Ship extends Component {
    render() {
        let cells = [];
        for (let i = 0; i < this.props.shipLength; i++) {
            let key = this.props.id + "-" + i;
            cells.push(<Field key={key} id={key}/>)
        }

        return (
            <div className="columns is-centered">
                <div className="column has-text-right">
                    <div className="field">
                        <div className="control">
                            <label className="label" style={{textDecoration: this.props.disabled ? 'line-through' : ''}}>{this.props.shipName}</label>
                        </div>
                    </div>
                </div>
                <div className="column has-text-left">
                    <table>
                        <tbody>
                            <tr id={this.props.id}>{cells}</tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
