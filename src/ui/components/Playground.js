import React, {Component} from "react";
import Field from "./Field";

export default class Playground extends Component {
    render() {
        const styles = {
            table: {
                borderCollapse: 'collapse',
                border: '1px solid black'
            },
            th: {
                border: '1px solid black',
                width: '25px',
                height: '25px'
            },
            td: {
                border: '1px solid black',
                width: '25px',
                height: '25px'
            }
        };

        let rows = [];
        let cells = [];
        cells.push(<Field key={0} id={0} />)

        for (let j = 1; j < 11; j++){
            let number = 64 + j;
            let ascii = String.fromCharCode(number)
            cells.push(<th style={styles.th} key={j} id={j}>{ascii}</th>)
        }
        rows.push(<tr style={styles.tr} key={0} id={0}>{cells}</tr>)

        let fields = this.props.player.playground.fields;

        for (let i = 1; i < 11; i++){
            cells = [];
            cells.push(<th style={styles.th} key={i * 10} id={i * 10}>{i}</th>)
            for (let j = 1; j < 11; j++){
                let pos = i * 10 + j;
                let cell = <Field key={pos} id={pos} />
                fields[pos] = cell;
                cells.push(cell)
            }
            rows.push(<tr style={styles.tr} key={i} id={i}>{cells}</tr>)
        }
        return (
            <table style={styles.table}>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }

}
