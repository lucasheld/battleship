import React, {Component} from "react";
import "./Field.css";
import {FIELD_TYPES} from "../../redux/actions/field-action";
import {connect} from "react-redux";
import {mapStateToProps, matchDispatchToProps} from "../../redux/mapper/field-mapper";
import FieldClass from "../../redux/data-classes/field";
import {fromEvent} from "rxjs";
import Ship from "./Ship";
import {getShipLength, parseShip} from "../../redux/reducers/ship-reducer";

class Field extends Component {
    constructor(props) {
        super(props);
        this.field = {};
        this.state = {
            renderElement: false,
            color: "field-valid"
        };
        this.eventMouseMove = null;
    }

    /* props
    className: sets the class for selecting the color defined in Field.css
     */

    isValid = (start, end) => {
        // if ship horizontal
        return Math.floor((start-1)/10) === Math.floor((end-2)/10);
        // TODO implement vertical
    };

    paintPlayground = (id) =>  {
        let startIndex;
        let endIndex;
        if (this.props.activeShip == null) {
            startIndex = id;
            endIndex = startIndex;
        } else {
            let shipIndex = Number(this.props.activeShip.slice(-1));
            startIndex = id - shipIndex;
            endIndex = startIndex + getShipLength(this.props.activeShip);
        }

        let ship;
        if (this.props.activeShip != null) {
            let shipInfo = parseShip(this.props.activeShip)
            ship = this.props.ships.filter(ship => ship.id === shipInfo.id && ship.name === shipInfo.name)[0]
        }

        if(this.isValid(startIndex, endIndex) && this.noShipsNear(startIndex, endIndex)) {
            for (let i = startIndex; i < endIndex; i++) {
                this.props.setFieldColor({id: i, color: "field-blocked"});
                this.props.setShipFieldIndex({id: i, shipIndex: i - startIndex});
            }
            // disable ship on the side
            if (ship) {
                this.props.disableShip(ship);
            }
        } else {
            // deselect ship in the side
            if (ship && !ship.disabled) {
                this.props.deselectShip(ship);
            }
        }
    };

    paintNextBlocked = () =>  {
        this.props.fields.filter(field => field.color === "field-blocked").forEach(field => {
            // if ship horizontal
            if(!(field.id % 10 === 1 && (field.id - 11) % 10 === 0)) this.paintOnlyIfUnused(field.id - 11);
            this.paintOnlyIfUnused(field.id - 10);
            if(!(field.id % 10 === 0 && (field.id - 9) % 10 === 1)) this.paintOnlyIfUnused(field.id - 9);
            if(!(field.id % 10 === 1 && (field.id - 1) % 10 === 0)) this.paintOnlyIfUnused(field.id - 1);
            if(!(field.id % 10 === 0 && (field.id + 1) % 10 === 1)) this.paintOnlyIfUnused(field.id + 1);
            if(!(field.id % 10 === 1 && (field.id + 9) % 10 === 0)) this.paintOnlyIfUnused(field.id + 9);
            this.paintOnlyIfUnused(field.id + 10);
            if(!(field.id % 10 === 0 && (field.id + 11) % 10 === 1)) this.paintOnlyIfUnused(field.id + 11);
            // TODO implement vertical
        });
    };

    paintOnlyIfUnused = (id) => {
        if(this.props.fields[id-1] !== undefined) {
            if(this.props.fields[id-1].color === "field-unused") {
                this.props.setFieldColor({id: id, color: "field-nextBlocked"});
            }
        }
    };

    fireOnMouseDown = () =>  {
        let shipInfo = parseShip(this.props.id);
        let ship = this.props.ships.filter(ship => ship.id === shipInfo.id && ship.name === shipInfo.name)[0]

        // do not allow using a ship twice
        if (ship.disabled) {
            return
        }

        this.props.setActiveShip(this.props.id);
        this.props.selectShip(ship);

        this.paintNextBlocked();
        this.setState({
            renderElement: true,
            renderLength: ship.size,
        });
        this.eventMouseMove = fromEvent(document, "mousemove").subscribe(this.handleMouseMove);
        fromEvent(document, "mouseup").subscribe(this.fireOnMouseUp);
    };

    repaintNextBlocked = () =>  {
        this.props.fields.filter(field => field.color === "field-nextBlocked").forEach( field => {
            this.props.setFieldColor({id: field.id, color: "field-unused"});
        })
    };

    fireOnMouseUp = (event) => {
        this.eventMouseMove.unsubscribe();
        if(document.elementFromPoint(event.x, event.y) === null) {
            return;
        }
        let id = Number(document.elementFromPoint(event.x, event.y).id);
        this.paintPlayground(id);
        this.repaintNextBlocked();
        this.setState({
            renderElement: false
        });
        this.props.setActiveShip(null);
    };

    handleMouseMove = (event) => {
        let element = document.getElementsByClassName("ship-current")[0];
        if (!element) {
            this.eventMouseMove.unsubscribe();
            return;
        }
        let bounds = element.getBoundingClientRect();
        element.style.left = `${event.clientX + this.calculateMiddle(bounds)}px`;
        element.style.top = `${event.clientY - bounds.height}px`;
        if(document.elementFromPoint(event.x, event.y) === null) {
            return;
        }
        this.renderDraggedShip(document.elementFromPoint(event.x, event.y).id);
    };

    renderDraggedShip = (id) => {
        let color;
        let shipIndex = Number(this.props.activeShip.slice(-1));
        let startIndex = id - shipIndex;
        let endIndex = startIndex + getShipLength(this.props.activeShip);
        color = this.isValid(startIndex, endIndex) && this.noShipsNear(startIndex, endIndex) ? "field-valid" : "field-invalid";
        this.setState({
            renderElement: true,
            color: color
        });
    };

    noShipsNear = (startIndex, endIndex) => {
        for (let i = startIndex; i < endIndex; i++) {
            // TODO implement vertical
            if(this.props.fields[i-1] !== undefined) if(this.props.fields[i-1].color !== "field-unused") return false;
            if(!(i % 10 === 1 && (i - 1) % 10 === 0)) if(this.props.fields[i-1-1] !== undefined) if(this.props.fields[i-1-1].color === "field-blocked") return false;
            if(!(i % 10 === 0 && (i + 1) % 10 === 1)) if(this.props.fields[i-1+1] !== undefined) if(this.props.fields[i-1+1].color === "field-blocked") return false;
            if(!(i % 10 === 1 && (i - 11) % 10 === 0)) if(this.props.fields[i-1-11] !== undefined) if(this.props.fields[i-1-11].color === "field-blocked") return false;
            if(this.props.fields[i-1-10] !== undefined) if(this.props.fields[i-1-10].color === "field-blocked") return false;
            if(!(i % 10 === 0 && (i - 9) % 10 === 1)) if(this.props.fields[i-1-9] !== undefined) if(this.props.fields[i-1-9].color === "field-blocked") return false;
            if(!(i % 10 === 0 && (i + 11) % 10 === 1)) if(this.props.fields[i-1+11] !== undefined) if(this.props.fields[i-1+10].color === "field-blocked") return false;
            if(this.props.fields[i-1+10] !== undefined) if(this.props.fields[i-1+10].color === "field-blocked") return false;
            if(!(i % 10 === 1 && (i + 9) % 10 === 0)) if(this.props.fields[i-1+9].color === "field-blocked") return false;
        }
        return true;
    };

    calculateMiddle = (bounds) => {
        return (getShipLength(this.props.id) - (Number(this.props.id.slice(-1)))) * 30 - bounds.width - 15;
    };

    getField = () =>  {
        if(this.props.type !== FIELD_TYPES.TEXT) {
            this.field = this.props.fields.filter( field => field.id === this.props.id && field.type === this.props.type)[0];
        }
    };

    componentDidMount() {
        if(this.props.type !== FIELD_TYPES.TEXT) {
            if(this.field === undefined) {
                this.field = new FieldClass(this.props.id, this.props.type);
                this.props.addField(this.field);
            }
        }
    }

    render() {
        this.getField();
        let className = "";
        if(this.field !== undefined) {
            className = this.field.color;
        }

        let copyShip = {
            id: 100,
            name: "",
            size: this.state.renderLength,
            selected: true,
            disabled: false
        }

        return (
            this.props.type === FIELD_TYPES.TEXT ?
                <div className={this.props.className + " field-ship"}>{this.props.text}</div>
                : this.props.type === FIELD_TYPES.PLAYGROUND ?
                <div className={this.props.className + " field-ship " + className} id={this.props.id}/>
                : // this.props.type equals FIELD_TYPES.SHIP
                <div className={this.props.className + " field-ship"} id={this.props.id} onMouseDown={this.fireOnMouseDown}>
                    {this.state.renderElement && <Ship id="current" className={this.state.color} ship={copyShip} isCopy={true} />}
                </div>
        )
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Field);
