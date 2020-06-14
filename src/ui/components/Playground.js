import React, {Component} from "react";
import Field from "./Field";
import {FIELD_TYPES} from "../../redux/actions/field-action";

export default class Playground extends Component {
    render() {
        let rows = [];
        let cells = [];
        cells.push(<div key={0} id={0} className="field-unused field-ship"/>);

        for (let j = -1; j > -11; j--) {
            let number = 64 - j;
            let ascii = String.fromCharCode(number);
            cells.push(<div key={j} id={j} className="field-unused field-ship">{ascii}</div>)
        }
        rows.push(<div style={{display: "flex", justifyContent: "center"}} key={0} id={0}>{cells}</div>);

        for (let i = 0; i < 10; i++) {
            cells = [];
            let textFieldId = ((i + 1) * -10) - 1;
            cells.push(<div key={textFieldId} id={textFieldId} className="field-unused field-ship">{i + 1}</div>);
            for (let j = 1; j < 11; j++) {
                let pos = i * 10 + j;
                let cell = <Field playground={this.props.playground} key={pos} id={pos} type={FIELD_TYPES.PLAYGROUND}
                                  className="field-unused"/>;
                cells.push(cell)
            }
            rows.push(<div style={{display: "flex", justifyContent: "center"}} key={i + 1} id={i + 1}>{cells}</div>)
        }
        return (
            <div id="playground-table">
                {rows}
            </div>
        )
    }
}
