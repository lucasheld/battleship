import React, {Component} from "react";
import "./Field.css";
import {FIELD_TYPES} from "../../redux/actions/field-action";
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/field-mapper";
import FieldClass from "../../redux/data-classes/field";

class Field extends Component {
    /* props
    className: sets the class for selecting the color defined in Field.css
     */

    fireOnDragEnter = () =>  {
        this.props.setFieldColor({id: this.field.id, color: "field-valid"});
    };

    fireOnMouseDown = () =>  {
        console.log(this.props.id + " was clicked")
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
        this.getOrCreateField();
        return (
            this.props.text
                ?
                <th className={this.props.className + " field-ship"}>{this.props.text}</th>
                : this.props.type === FIELD_TYPES.PLAYGROUND ?
                <td className={this.props.className + " field-ship " + this.field.color} id={this.props.id} onDragEnter={this.fireOnDragEnter}/>
                : // this.props.type equals FIELD_TYPES.SHIP
                <td className={this.props.className + " field-ship"} id={this.props.id} onMouseDown={this.fireOnMouseDown} />
        )
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Field);
