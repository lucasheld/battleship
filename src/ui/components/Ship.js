import React, {Component} from "react";
import "./Ship.css"

export default class Ship extends Component {

    render() {
        let row = [];
        let cells = [];

        for (let i = 0; i < this.props.shipLength; i++) {
            cells.push(<td></td>)
        }
        row.push(<tr id={this.props.id}>{cells}</tr>);
        return (
            <div>
                <text>{this.props.shipName}</text>
                <table>
                    <tbody>
                        {row}
                    </tbody>
                </table>
            </div>
        )
    }

}