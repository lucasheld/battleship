import React, {Component} from "react";

export default class Field extends Component {
    render() {
        return (
            <td key={this.props.key} id={this.props.id}>{this.props.text}</td>
        )
    }
}
