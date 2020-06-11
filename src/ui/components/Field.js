import React, {Component} from "react";

export default class Field extends Component {
    render() {
        const styles = {
            td: {
                border: '1px solid black',
                width: '25px',
                height: '25px'
            }
        };

        return (
            <td style={styles.td} id={this.props.id}>{this.props.text}</td>
        )
    }
}
