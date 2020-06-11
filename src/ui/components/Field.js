import React, {Component} from "react";

export default class Field extends Component {
    render() {
        return (
            <td id={this.props.id}>{this.props.text}</td>
        )
    }
}
