import React, {Component} from "react";
import Field from "./Field";

export default class ShipDirectionDislog extends Component {
    /* props
    shipName
    shipLength
     */

    render() {
        let rows = [];

        for (let i = 0; i < this.props.shipLength; i++) {
            let cells = []
            for (let j = 0; j < this.props.shipLength + 2; j++) {
                let className = "";

                if (i === 0 && j !== 1) {
                    className = "ship-selected"
                }
                if (i !== 0 && j === 0) {
                    className = "ship-selected"
                }
                cells.push(<Field className={className}/>)
            }
            rows.push(<tr>{cells}</tr>)
        }


        return (
            <div className="box">
                <h2 className="subtitle">
                    {this.props.shipName}
                    <br/>
                    (Ausrichtung wählen)
                </h2>
                <hr/>
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}
