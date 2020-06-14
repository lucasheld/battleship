import React, {Component} from "react";
import Field from "./Field";
import {FIELD_TYPES} from "../../redux/actions/field-action";

/**
 * Component for a playground.
 */
export default class Playground extends Component {
    render() {
        let rows = [];
        let cells = [];
        // Top left cell (empty)
        cells.push(<div key={0} id={0} className="field-unused field-ship"/>);

        for (let j = -1; j > -11; j--) {
            let number = 64 - j;
            let ascii = String.fromCharCode(number);
            // Top fields with letters A - J
            cells.push(<div key={j} id={j} className="field-unused field-ship">{ascii}</div>)
        }
        // The first row with the fields from above
        rows.push(<div style={{display: "flex", justifyContent: "center"}} key={0} id={0}>{cells}</div>);

        for (let i = 0; i < 10; i++) {
            cells = [];
            let textFieldId = ((i + 1) * -10) - 1;
            // First left field has always a number in it
            cells.push(<div key={textFieldId} id={textFieldId} className="field-unused field-ship">{i + 1}</div>);
            for (let j = 1; j < 11; j++) {
                let pos = i * 10 + j;
                // All other fields are actual fields that could be clicked or messed around with in field.js
                let cell = <Field playground={this.props.playground} key={pos} id={pos} type={FIELD_TYPES.PLAYGROUND}
                                  className="field-unused"/>;
                cells.push(cell)
            }
            // Add always a row from one iteration of the outer for loop
            rows.push(<div style={{display: "flex", justifyContent: "center"}} key={i + 1} id={i + 1}>{cells}</div>)
        }
        // Returns the table that was build above
        return (
            <div id="playground-table">
                {rows}
            </div>
        )
    }
}
