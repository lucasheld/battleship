import React, {Component} from "react";
import "./Field.css";

export default class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: ""
        };
    }
    /* props
    className: sets the class for selecting the color defined in Field.css
     */

    fireOnDragOver = (event) =>  {
        event.preventDefault();
        this.setState({
            color: "field-valid"
        });
    };

    fireOnDrop = (event) =>  {
        event.preventDefault();
    };

    render() {
        return (
            this.props.text
                ?
                <th className={this.props.className + " field-ship"}>{this.props.text}</th>
                :
                <td className={this.props.className + " field-ship " + this.state.color} id={this.props.id} onDrop={this.fireOnDrop} onDragOver={this.fireOnDragOver}/>
        )
    }
}
