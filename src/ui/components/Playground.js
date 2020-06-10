import React, {Component} from "react";

export default class Playground extends Component {

    render() {
        let rows = [];
        let cells = [];
        cells.push(<td key={0} id={0}></td>)

        for (let j = 1; j < 11; j++){
            let number = 64 + j;
            let ascii = String.fromCharCode(number)
            cells.push(<td key={j} id={j}>{ascii}</td>)
        }
        rows.push(<tr key={0} id={0}>{cells}</tr>)

        let fields = this.props.player.Playground().fields();

        for (let i = 1; i < 11; i++){
            cells = []
            cells.push(<td key={i * 10} id={i * 10}>{i + 1}</td>)
            for (let j = 1; j < 11; j++){
                let pos = i * 10 + j;
                let cell = <td key={pos} id={pos}></td>
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