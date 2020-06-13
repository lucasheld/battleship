import React, {Component} from "react";
import Field from "./Field";

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
        for (let i = 0; i < this.props.ship.size; i++) {
            let cells = []
            for (let j = 0; j < this.props.ship.size + 2; j++) {
                let className = "";
                if ((i === 0 && j !== 1) || (i !== 0 && j === 0)) {
                    className = "ship-selected"
                }
                let id = this.props.ship.name.toLowerCase() + "-" + this.props.ship.id + "-" + this.props.index;
                cells.push(<Field playground={this.props.playground} id={id} className={className} allowDrag={true} />)
            }
            rows.push(<div style={{display: "flex", justifyContent: "center"}}>{cells}</div>)
        }

        return (
            <div className="box" style={{backgroundColor: "#eeeeee"}}>
                <h2 className="subtitle">
                    {this.props.ship.name}
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
