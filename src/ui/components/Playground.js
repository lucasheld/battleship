import React, {Component} from "react";
import Field from "./Field";

export default class Playground extends Component {
    render() {
        let rows = [];
        let cells = [];
        cells.push(<Field key={0} id={0} className="field-unused" />);

        for (let j = 1; j < 11; j++){
            let number = 64 + j;
            let ascii = String.fromCharCode(number);
            cells.push(<Field key={j} id={j} className="field-unused" text={ascii}/>)
        }
        rows.push(<tr key={0} id={0}>{cells}</tr>);

        //let fields = this.props.player.playground.fields;

        for (let i = 1; i < 11; i++){
            cells.push(<Field key={i * 10} id={i * 10} className="field-unused" text={i}/>);
            for (let j = 1; j < 11; j++){
                let pos = i * 10 + j;
                let cell = <Field key={pos} id={pos} className="field-unused" />;
                //fields[pos] = cell;
                cells.push(cell)
            }
            rows.push(<tr key={i} id={i}>{cells}</tr>)
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
