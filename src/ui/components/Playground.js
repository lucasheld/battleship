import React, {Component} from "react";

export default class Playground extends Component {

    render() {
        let rows = [];
        let cell = [];
        cell.push(<td></td>)

        for (let j = 0; j < 10; j++){
            let number = 65 + j;
            let ascii = String.fromCharCode(number)
            cell.push(<td key={j} id={j}>{ascii}</td>)
        }
        rows.push(<tr key={0} id={0}>{cell}</tr>)

        for (let i = 0; i < 10; i++){
            cell = []
            cell.push(<td>{i + 1}</td>)
            for (let j = 0; j < 10; j++){
                cell.push(<td key={j} id={j}></td>)
            }
            rows.push(<tr key={i} id={i}>{cell}</tr>)
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