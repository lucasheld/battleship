import React, {Component} from "react";
import Field from "./Field";
import {FIELD_TYPES} from "../../redux/actions/field-action";

export default class Playground extends Component {
    render() {
        let rows = [];
        let cells = [];
        cells.push(<Field key={0} id={0} type={FIELD_TYPES.TEXT} className="field-unused" />);

        for (let j = -1; j > -11; j--){
            let number = 64 - j;
            let ascii = String.fromCharCode(number);
            cells.push(<Field key={j} id={j} type={FIELD_TYPES.TEXT} className="field-unused" text={ascii}/>)
        }
        rows.push(<tr key={0} id={0}>{cells}</tr>);

        for (let i = 0; i < 10; i++){
            cells = [];
            let textFieldId = ((i+1) * -10) - 1;
            cells.push(<Field key={textFieldId} id={textFieldId} type={FIELD_TYPES.TEXT} className="field-unused" text={i+1}/>);
            for (let j = 1; j < 11; j++){
                let pos = i * 10 + j;
                let cell = <Field key={pos} id={pos} type={FIELD_TYPES.PLAYGROUND} className="field-unused" />;
                cells.push(cell)
            }
            rows.push(<tr key={i+1} id={i+1}>{cells}</tr>)
        }
        return (
            <table id="playground-table">
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}
