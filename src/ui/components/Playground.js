import React, {Component} from "react";
import "./Playground.css"
import Field from "./Field";

export default class Playground extends Component {

    render() {
        let rows = [];
        let cells = [];
        cells.push(<Field key={0} id={0}/>)

        for (let j = 1; j < 11; j++){
            let number = 64 + j;
            let ascii = String.fromCharCode(number)
            cells.push(<th key={j} id={j}>{ascii}</th>)
        }
        rows.push(<tr key={0} id={0}>{cells}</tr>)

        let fields = this.props.player.playground.fields;

        for (let i = 1; i < 11; i++){
            cells = []
            cells.push(<th key={i * 10} id={i * 10}>{i}</th>)
            for (let j = 1; j < 11; j++){
                let pos = i * 10 + j;
                let cell = <Field key={pos} id={pos}/>
                fields[pos] = cell;
                cells.push(cell)
            }
            rows.push(<tr key={i} id={i}>{cells}</tr>)
        }
        return (
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }

}
