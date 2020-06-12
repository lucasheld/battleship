import React, {Component} from "react";
import "./Field.css";
import {FIELD_TYPES} from "../../redux/actions/field-action";
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/field-mapper";
import FieldClass from "../../redux/data-classes/field";

class Field extends Component {
    constructor(props) {
        super(props);
        this.getOrCreateField();
    }
    /* props
    className: sets the class for selecting the color defined in Field.css
     */

    fireOnDragOver = (event) =>  {
        event.preventDefault();
        this.props.setFieldColor({id: this.field.id, color: "field-valid"});
        console.log("hi")
    };

    fireOnDrop = (event) =>  {
        event.preventDefault();
    };

    getOrCreateField = () =>  {
        if(this.props.type === FIELD_TYPES.PLAYGROUND) {
            this.field = this.props.fields.filter( field => field.id === this.props.id)[0];
            if(this.field === undefined) {
                this.field = new FieldClass(this.props.id, this.props.type);
                this.props.addField(this.field);
            }
        }
    };

    render() {
        return (
            this.props.text
                ?
                <th className={this.props.className + " field-ship"}>{this.props.text}</th>
                : this.props.type === FIELD_TYPES.PLAYGROUND ?
                <td className={this.props.className + " field-ship " + this.field.color} id={this.props.id} onDrop={this.fireOnDrop} onDragOver={this.fireOnDragOver}/>
                :
                <td className={this.props.className + " field-ship"} id={this.props.id}/>
        )
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Field);
