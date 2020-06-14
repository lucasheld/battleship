import React, {Component} from "react";
import Field from "./Field";
import {FIELD_TYPES} from "../../redux/actions/field-action";
import "./Field.css";

export default class ShipDirectionDialog extends Component {
    /* props
    enabled
    ship
    index
    playground
     */

    render() {
        // do not render anything if popup closed
        if (this.props.enabled === false) return null;

        let rows = [];
        let keys = 0;
        for (let i = 0; i < this.props.ship.size; i++) {
            let cells = [];
            for (let j = 0; j < this.props.ship.size + 2; j++) {
                if (i === 0 && j > 1) {
                    let id = this.props.ship.name.toLowerCase() + "-" + this.props.ship.id + "-" + (j-2);
                    cells.push(<Field orientation="horizontal" playground={this.props.playground} id={id} key={++keys} className="ship-selected" type={FIELD_TYPES.OVERLAY} />);
                } else if (j === 0) {
                    let id = this.props.ship.name.toLowerCase() + "-" + this.props.ship.id + "-" + i;
                    cells.push(<Field orientation="vertical" playground={this.props.playground} id={id} key={++keys} className="ship-selected" type={FIELD_TYPES.OVERLAY} />);
                } else {
                    cells.push(<div key={++keys} className="field-ship"/>);
                }
            }
            rows.push(<div style={{display: "flex", justifyContent: "center"}} key={++keys} >{cells}</div>)
        }

        return (
            <div className="box" style={{backgroundColor: "#eeeeee"}}>
                <h2 className="subtitle">
                    {this.props.ship.name !== "Battleship" && this.props.ship.id+1 + "."} {this.props.ship.name}
                    <br/>
                    (Ausrichtung wählen)
                </h2>
                <hr/>
                <div id="playground-table">
                    {rows}
                </div>
            </div>
        )
    }
}
