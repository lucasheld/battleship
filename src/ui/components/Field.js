import React, {Component} from "react";
import "./Field.css";
import {FIELD_TYPES} from "../../redux/actions/field-action";
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/field-mapper";
import FieldClass from "../../redux/data-classes/field";
import Ship from "./Ship";
import {fromEvent} from "rxjs";

class Field extends Component {
    constructor(props) {
        super(props);
        this.field = {}
        this.state = {
            renderElement: false
        }
        this.eventMouseMove = null;
    }

    /* props
    className: sets the class for selecting the color defined in Field.css
     */

    fireOnMouseUp = () =>  {
        this.props.setFieldColor({id: this.field.id, color: "field-valid"});
    };

    fireOnMouseDown = () =>  {
        this.setState({
            renderElement: true
        })
        this.eventMouseMove = fromEvent(document, "mousemove").subscribe(this.handleMouseMove);
        fromEvent(document, "mouseup").subscribe(this.handleMouseUp);
        console.log(this.props.id + " was clicked")
    };

    handleMouseUp = (e) => {
        const element = document.getElementsByClassName("ship-current")[0];
        this.eventMouseMove.unsubscribe()
        element.remove();
    }

    handleMouseMove = (e) => {
        const element = document.getElementsByClassName("ship-current")[0];
        element.style.left = `${e.clientX}px`;
        element.style.top = `${e.clientY}px`;
    }

    getOrCreateField = () =>  {
        if(this.props.type !== FIELD_TYPES.TEXT) {
            this.field = this.props.fields.filter( field => field.id === this.props.id && field.type === this.props.type)[0];
            if(this.field === undefined) {
                this.field = new FieldClass(this.props.id, this.props.type);
                this.props.addField(this.field);
            }
        }
    };

    render() {
        if (this.state.renderElement) {
            return <Ship id="battleship1" shipLength={5} shipName="Schlachtschiff"/>
        }

        this.getOrCreateField();
        return (
            this.props.text
                ? // this.props.type equals FIELD_TYPES.TEXT
                <div className={this.props.className + " field-ship"}>{this.props.text}</div>
                : this.props.type === FIELD_TYPES.PLAYGROUND ?
                <div className={this.props.className + " field-ship " + this.field.color} id={this.props.id} onMouseUp={this.fireOnMouseUp}/>
                : // this.props.type equals FIELD_TYPES.SHIP
                <div className={this.props.className + " field-ship"} id={this.props.id} onMouseDown={this.fireOnMouseDown} />
        )
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Field);
