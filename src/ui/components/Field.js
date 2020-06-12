import React, {Component} from "react";
import "./Field.css";

export default class Field extends Component {
    /* props
    className: sets the class for selecting the color defined in Field.css
     */

    render() {
        return (
            this.props.text
                ?
                <th className={this.props.className + " field-ship"}>{this.props.text}</th>
                :
                <td className={this.props.className + " field-ship"} id={this.props.id}/>
        )
    }
}
