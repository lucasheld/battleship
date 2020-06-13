import React, {Component} from "react";
import Field from "./Field";

export default class ShipDirectionDialog extends Component {
    /* props
    ship
    playground
     */

    render() {
        let size = 4;
        let name = "test";

        let rows = [];

        for (let i = 0; i < size; i++) {
            let cells = []
            for (let j = 0; j < size + 2; j++) {
                let className = "";
                if ((i === 0 && j !== 1) || (i !== 0 && j === 0)) {
                    className = "ship-selected"
                }
                cells.push(<Field playground={this.props.playground} key={"popup-" + i + "-" + j} className={className} allowDrag={true} />)
            }
            rows.push(<div style={{display: "flex"}}>{cells}</div>)
        }

        return (
            <div className="box">
                <h2 className="subtitle">
                    {name}
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
